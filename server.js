//dependencies
const request = require("request");
const bodyParser = require("body-parser");
const express = require("express");
const exphbs = require("express-handlebars");
const cheerio = require("cheerio");
const mongoose = require("mongoose");
var axios = require("axios");
var logger= require("morgan");

//initialize express
const app = express();


//variables
const PORT = process.env.PORT || 8080;

var db = require('./models');


//var db = mongoose.connection;


//initialize body parser
app.use(bodyParser.urlencoded({
    extended: true
}));                 
app.use(bodyParser.json());
//express.static
app.use(express.static("public"));

//set Handlebars as default layout
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.set("view engine", "handlebars");
app.use(logger("dev"));

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {useNewUrlParser: true});

//routes
//require("./routes/apiroutes")(app);
//require("./routes/htmlroutes")(app);

//scraping the website for articles
app.get("/scrape", function(req, res){
//grab the body of the html with request
   axios.get("https://www.nytimes.com/opinion").then(function(response){
//load the html into cheerio
        var $ = cheerio.load(response.data);
    
        var result={};
        $("div.story-body").each(function(i, element){
            var link = $(element).find("a").attr("href");
            var title = $(element).find("h2.headline").text();
            var summary = $(elment).find("p.summary").text();


    

        result.title = title;
        result.link = link;
        result.summary = summary;



    })
   

});
//route to homepage
app.get("/", function(req, res){
    res.render("index");

});
//get all articles
app.get("/articles", function(req, res){

})

app.get("/saved", function(req, res){

});
})

//listenign on port 8080!
app.listen(PORT, () => {
    console.log("Server is running on port:" + PORT)
});
