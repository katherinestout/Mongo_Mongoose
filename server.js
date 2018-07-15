const request = require("request");
const bodyParser = require("body-parser");
const express = require("expres");
const expresshb = require("express-handlebars");
const cherrio = require("cheerio");
const mongoose = require("mongoose");
const app = express();


//variables
const PORT = process.env.PORT || 3000;
const db = require('./models');



app.listen(PORT, () => {
    console.log("Server is running on port:" + PORT)
});