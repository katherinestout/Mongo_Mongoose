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

//const PORT = 8080;
//variables
const PORT = 8080;

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

//Mongo DB connection
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/mongoHeadlines";
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.log("Could not connect to MongoDB", err));

app.use(logger("dev"));


app.get("/", function(req, res){
  res.render("index");
});


//scraping the website for articles
app.get("/scrape", function(req, res){
//grab the body of the html with request
   axios.get("https://www.nytimes.com").then(function(response){
//load the html into cheerio
        var $ = cheerio.load(response.data);


        $("article").each(function(i, element) {
            // Save an empty result object
            var result = {};
      
            // Add the text and href of every link, and save them as properties of the result object
            result.title = $(this)
              .children("h2")
              .text()
              .trim()
            result.link = $(this)
              .children("h2")
              .attr("href")
              .children("a")
            result.summary = $(this)
            .children(".summary")
            .text()
            .trim();
            // Create a new Article using the `result` object built from scraping
            db.Article.create(result)
              .then(function(dbArticle) {
                // View the added result in the console
                console.log(dbArticle);
              })
              .catch(function(err) {
                // If an error occurred, send it to the client
                return res.json(err);
              });
          });
      
          // If we were able to successfully scrape and save an Article, send a message to the client
          res.send("Scrape Complete");
          res.redirect("/");
        
        });
      });
      

   
//route to homepage
app.get("/articles", function(req, res){
    db.Article.find({})
    .then(function(dbArticle){
        res.json(dbArticle)
    })
.catch(function(err){
    res.json(err);
});

});

// Route for grabbing a specific Article by id, populate it with it's note
app.get("/articles/:id", function(req, res) {
    // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
    db.Article.findOne({ _id: req.params.id })
      // ..and populate all of the notes associated with it
      .populate("note")
      .then(function(dbArticle) {
        // If we were able to successfully find an Article with the given id, send it back to the client
        res.json(dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });
  

//get all articles


app.get("/saved", function(req, res){

});


//listenign on port 8080!
app.listen(PORT, () => {
    console.log("Server is running on port:" + PORT)
});
