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


//GET Saler properties
router.get("/", function(req,res){
  //Get all employees
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

module.exports = router;
