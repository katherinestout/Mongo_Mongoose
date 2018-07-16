//dependencies
const request = require("request");
const bodyParser = require("body-parser");
const express = require("express");
const expresshb = require("express-handlebars");
const cherrio = require("cheerio");
const mongoose = require("mongoose");

//initialize express
const app = express();


//variables
const PORT = process.env.PORT || 8080;
//const db = require('./models');

//initialize body parser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//set Handlebars as default layout
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");



// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

//listenign on port 8080!
app.listen(PORT, () => {
    console.log("Server is running on port:" + PORT)
});