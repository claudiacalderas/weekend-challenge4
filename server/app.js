var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var path = require("path");
var listings = require("./routes/listings.js");

//Database Variables
var mongoose = require("mongoose");
var mongoURI = "mongodb://realtor:12345@ds147480.mlab.com:47480/realestate";
var MongoDB = mongoose.connect(mongoURI).connection;

//Error connecting to the database
MongoDB.on("error", function(err){
 console.log("Mongo Connection Error:" + err);
});

//Successful connection to the database
MongoDB.once("open", function(){
 console.log("Connected to Mongo..");
});

//Set the listening port
app.set("port", (process.env.PORT || 5000));

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("server/public/"));

//Routes
app.use("/listings", listings);
app.get("/", function(req,res){
  res.sendFile(path.resolve("server/public/views/index.html"));
});



app.listen(app.get("port"), function(){
    console.log("Listening on port: " + app.get("port"));
});
