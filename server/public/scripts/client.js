$(document).ready(function() {
  console.log("jQuery sourced");

  getSaleProperties();

});

function getSaleProperties() {
  console.log("In getSaleProperties");
  $.ajax({
    type: "GET",
    url: "/listings",
    success: function(response) {
      console.log("Getting listings: ",response);
      displayProperties(response);
    }
  });
}

function displayProperties(arrayOfProperties) {
  console.log("Displaying properties");
  var $el;
  $('.listingsContainerDiv').empty();
  var propertyId;
  var propertyType;
  var propertySqft;
  var propertyCity;
  var propertyPrice;
  for (var i = 0; i < arrayOfProperties.length; i++) {

    for(var name in arrayOfProperties[i]) {
      switch (name) {
        case "_id":
            propertyId = arrayOfProperties[i][name];
          break;
        case "rent":
            propertyType = "FOR RENT";
            propertyPrice = "Monthly rent: $" + arrayOfProperties[i][name];
          break;
        case "cost":
            propertyType = "FOR SALE";
            propertyPrice = "$" + arrayOfProperties[i][name];

          break;
        case "sqft":
            propertySqft = arrayOfProperties[i][name] + " Sqft";
          break;
        case "city":
            propertyCity = arrayOfProperties[i][name];
          break;
        default:

      }
    }

    var elementsToAppend = '';

    elementsToAppend +='<div class="col-xs-4 col-md-2">';
    elementsToAppend +='<h3>' + propertyType + '</h3>';
    elementsToAppend +='<p>' + propertyCity + '</p>';
    elementsToAppend +='<p>' + propertySqft + '</p>';
    elementsToAppend +='<p>' + propertyPrice + '</p></div>';
    console.log(elementsToAppend);
    $('.listingsContainerDiv').append(elementsToAppend);
  }


}
