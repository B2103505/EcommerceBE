const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
dotenv.config();
const routes = require('./routes');
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3001;

// app.get('/', (req, res) => {
//     return res.send('Hello world');
// })

app.use(bodyParser.json());

routes(app);


mongoose.connect(`${process.env.MONGO_db}`)
    .then(() => {
        console.log('connect database success!');
    })
    .catch((err) => {
        console.log(err);
    })

app.listen(port, () => {
    console.log('Server is running on port: ', + port);
});