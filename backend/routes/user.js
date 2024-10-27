const express = require('express');
const bcrypt = require('bcrypt')
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

const zod = require('zod');
const jwt = require('jsonwebtoken');

const { User, Account } = require('../db');
const { authMiddleware } = require('../middleware');

const signupBody = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
});

router.post("/signup", async (req, res) => {
    try {
        const body = req.body;
        const validate = signupBody.safeParse(body);

        if (!validate.success) {
            return res.status(411).json({
                message: "Email already taken / incorrect inputs"
            });
        }

        const existingUser = await User.findOne({ username: body.username });

        if (existingUser) {
            return res.status(411).json({
                message: "Email already taken / incorrect inputs"
            });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(body.password, saltRounds)

        const user = await User.create({
            username: body.username,
            password: hashedPassword,
            firstName: body.firstName,
            lastName: body.lastName,
        });

        const userId = user._id;

        await Account.create({
            userId,
            balance: 1 + Math.random() * 10000
        });

        const token = jwt.sign({ userId }, JWT_SECRET);

        res.json({
            message: "User created successfully",
            token: token
        });
    } catch (err) {
        console.error(err); 
        res.status(500).json({ message: "Internal server error" });
    }
});

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
});

router.post("/signin", async (req, res) => {
    try {
        const body = req.body;
        const validate = signinBody.safeParse(body);

        if (!validate.success) {
            return res.status(411).json({
                message: "Email already taken / incorrect inputs"
            });
        }

        const user = await User.findOne({
            username: body.username
        });

        if (user) {
            const isMatch = await bcrypt.compare(body.password, user.password);
            if (isMatch) {
                const token = jwt.sign({ userId: user._id }, JWT_SECRET);
                res.json({
                  message: "Sign in successful",
                  token: token
                })
                return;
            }
        }

        res.status(411).json({
            message: "Error while logging in"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()
});

router.put('/', authMiddleware, async (req, res) => {
    try {
        const body = req.body;
        const validate = updateBody.safeParse(body);

        if (!validate.success) {
            return res.status(411).json({
                message: "Error while updating information"
            });
        }

        await User.updateOne(
            { _id: req.userId },
            { $set: body }
        );

        res.json({
            message: 'Updated successfully'
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get('/bulk', authMiddleware, async (req, res) => {
    try {
        const filter = req.query.filter || "";
        const users = await User.find({
            $or: [{
                firstName: { "$regex": filter, "$options": "i" }
            }, {
                lastName: { "$regex": filter, "$options": "i"  }
            }],
            _id: { "$ne": req.userId }
        });
        res.json({
            user: users.map(user => ({
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id
            }))
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;