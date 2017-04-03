var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
    {name: "Salmon Creek", image: "https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg"},
    {name: "Granite Hill", image: "https://farm9.staticflickr.com/8225/8524305204_43934a319d.jpg"},
    {name: "Mountain Goat's Rest", image: "https://farm8.staticflickr.com/7258/7121861565_3f4957acb1.jpg"},
    {name: "Granite Hill", image: "https://farm9.staticflickr.com/8225/8524305204_43934a319d.jpg"},
    {name: "Mountain Goat's Rest", image: "https://farm8.staticflickr.com/7258/7121861565_3f4957acb1.jpg"},
    {name: "Granite Hill", image: "https://farm9.staticflickr.com/8225/8524305204_43934a319d.jpg"},
    {name: "Mountain Goat's Rest", image: "https://farm8.staticflickr.com/7258/7121861565_3f4957acb1.jpg"},
    {name: "Granite Hill", image: "https://farm9.staticflickr.com/8225/8524305204_43934a319d.jpg"},
    {name: "Mountain Goat's Rest", image: "https://farm8.staticflickr.com/7258/7121861565_3f4957acb1.jpg"},
    {name: "Granite Hill", image: "https://farm9.staticflickr.com/8225/8524305204_43934a319d.jpg"},
    {name: "Mountain Goat's Rest", image: "https://farm8.staticflickr.com/7258/7121861565_3f4957acb1.jpg"},
]; 
     
app.get("/", function(req, res){
   res.render("landing"); 
});

app.get("/campgrounds", function(req, res){
     res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res){
   var name = req.body.name;
   var image = req.body.image;
   var newCampground = {name: name, image: image};
   campgrounds.push(newCampground);
   res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res) {
   res.render("new.ejs"); 
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The Yelpcamp server has started!");
});