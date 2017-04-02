var express = require("express");
var app = express();
app.set("view engine", "ejs");

app.get("/", function(req, res){
   res.render("landing"); 
});

app.get("/campgrounds", function(req, res){
   var campgrounds = [
        {name: "Salmon Creek", image: "https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg"},
        {name: "Granite Hill", image: "https://farm9.staticflickr.com/8225/8524305204_43934a319d.jpg"},
        {name: "Mountain Goat's Rest", image: "https://farm8.staticflickr.com/7258/7121861565_3f4957acb1.jpg"}
     ] 
     
     res.render("campgrounds", {campgrounds: campgrounds});
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The Yelpcamp server has started!");
});