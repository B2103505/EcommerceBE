const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
dotenv.config();
const routes = require('./routes');
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3001;
const cors = require('cors')
const cookieParser = require('cookie-parser')

// app.get('/', (req, res) => {
//     return res.send('Hello world');
// })

// app.use(bodyParser.json());

app.use(express.json());
app.use(cors())
app.use(cookieParser())

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