var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var path = require("path");

//Set the listening port
app.set("port", (process.env.PORT || 5000));

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("./server/public/"));

//Routes
app.get("/", function(req,res){
  res.sendFile(path.resolve("server/public/views/index.html"));
});


app.listen(app.get("port"), function(){
    console.log("Listening on port: " + app.get("port"));
});
