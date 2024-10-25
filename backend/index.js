require('dotenv').config();

const express = require("express");
const cors = require('cors');
const rootRouter = require("./routes/index");
const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());


app.use('/api/v1', rootRouter);

app.listen(port, function(){
    console.log(`app is listening to ${port}`)
})