var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

// Schema for houses on sale
var SaleSchema = mongoose.Schema({
  cost : Number,
  sqft: Number,
  city: String
});

// Schema for houses on rent
var RentSchema = mongoose.Schema({
  rent: Number,
  sqft : Number,
  city: String
});

var Sale = mongoose.model("sale", SaleSchema, "listings");
var Rent = mongoose.model("rent", RentSchema, "listings");


//GET properties
router.get("/", function(req,res){
  //Get all properties
  console.log("listings get route");
  Sale.find(function(err, SaleSchema){
    if(err){
      console.log(err);
      res.sendStatus(500);
    }
    console.log(SaleSchema);
    res.send(SaleSchema);
  });
});

//Saves a new property
router.post("/:type", function(req,res){
  var type = req.params.type;
  // checks if it is a rent or sale property
  // and based on that chooses the schema to use
  if (type === "sale") {
    var property = new Sale();
    property.cost = req.body.cost;

  } else {
    var property = new Rent();
    property.rent = req.body.rent;
  }
  property.city = req.body.city;
  property.sqft = req.body.sqft;
  property.save(function(err, savedProperty){
    if(err){
      console.log(err);
      res.sendStatus(500);
    }
    res.send(savedProperty);
  });
});

module.exports = router;
