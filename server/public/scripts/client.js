$(document).ready(function() {
  console.log("jQuery sourced");

  eventListeners();
  getProperties();


});

function eventListeners() {

  $('#addNewBtn').on('click', clickSubmit);

  $('#optionsRadios1').on('click',function() {
    $("#priceInput").attr("placeholder", "Cost");
  });

  $('#optionsRadios2').on('click',function() {
    $("#priceInput").attr("placeholder", "Monthly Rent");
  });
}

// Event Handlers:
function clickSubmit(){
  console.log("addNewBtn clicked");
  var property = {};
  property.city = $("#cityInput").val();
  property.sqft = $("#sqftInput").val();
  // stores sale or rent depending on the value of the radio inputs:
  var typeOfProperty = $('input[name=optionsRadios]:checked').val();
  console.log("typeOfProperty = ", typeOfProperty);
  if(typeOfProperty == "sale") {
    property.cost = $("#priceInput").val();
    console.log("cost:", property.cost);
  } else {
    property.rent = $("#priceInput").val();
    console.log("rent:", property.rent);
  }
  $("#cityInput").val("");
  $("#sqftInput").val("");
  $("#priceInput").val("");
  console.log(property, typeOfProperty);
  postProperty(property, typeOfProperty);
}

function postProperty(property, type) {
  console.log("In postProperties");
  $.ajax({
    type: "POST",
    url: "/listings/" + type,
    data: property,
    success: function(response){
      getProperties();
    }
  });
}

function getProperties() {
  console.log("In getProperties");
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
      }
    }
    var elementsToAppend = '';
    elementsToAppend +='<div class="col-xs-4 col-md-2 ">'; //thumbnail
    elementsToAppend +='<h3 class="text-center"><span class="glyphicon glyphicon-home" aria-hidden="true"></span> ' + propertyType + '</h3>';
    elementsToAppend +='<p class="text-center">' + propertyCity + '</p>';
    elementsToAppend +='<p class="text-center">' + propertySqft + '</p>';
    elementsToAppend +='<p class="text-center">' + propertyPrice + '</p></div>';
    $('.listingsContainerDiv').append(elementsToAppend);
  }
}
