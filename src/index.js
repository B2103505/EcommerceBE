const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
dotenv.config();

const app = express()
const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
    return res.send('Hello world');
})

mongoose.connect(`mongodb+srv://phamvulamvip:${process.env.MONGO_db}@vuonglam.uxncjyl.mongodb.net/?retryWrites=true&w=majority&appName=VuongLam`)
    .then(() => {
        console.log('connect database success!');
    })
    .catch((err) => {
        console.log(err);
    })

app.listen(port, () => {
    console.log('Server is running on port: ', + port);
});