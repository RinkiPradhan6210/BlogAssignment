const express = require('express');
const route = require('./routes/route.js');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config()

const app = express();

app.use(express.json())

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))

app.use('/', route);
app.listen(process.env.PORT, function () {
    console.log('Express app running on port ' + (process.env.PORT))
});