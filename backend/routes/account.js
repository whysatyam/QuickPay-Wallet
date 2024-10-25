const express = require('express');
const router = express.Router();
const { default: mongoose } = require('mongoose');

const { authMiddleware } = require('../middleware');
const { Account } = require('../db');

router.get('/balance', authMiddleware, async (req, res) => {
    try {
        const account = await Account.findOne({
            userId: req.userId
        });

        res.json({
            balance: account.balance
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post('/transfer', authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { amount, to } = req.body;

        const account = await Account.findOne({
            userId: req.userId
        }).session(session);

        if (!account || account.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "insufficient balance"
            });
        }

        const toAccount = await Account.findOne({
            userId: to
        }).session(session);

        if (!toAccount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "invalid account"
            });
        }

        // money transfer
        await Account.updateOne({
            userId: req.userId
        }, {
            $inc: {
                balance: -amount
            }
        }).session(session);

        await Account.updateOne({
            userId: to
        }, {
            $inc: {
                balance: amount
            }
        }).session(session);

        await session.commitTransaction();

        res.json({
            message: 'transfer successful'
        })

    } catch (err) {
        console.error(err);
        await session.abortTransaction(); 
        res.status(500).json({ message: "Internal server error" });

    } finally {
        session.endSession(); 
    }
})

module.exports = router;