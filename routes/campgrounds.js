const express    = require("express"),
      router     = express.Router(),
      Campground = require("../models/campground"),
      middleware = require("../middleware"),
      geocoder = require('geocoder');

// INDEX - show all campgrounds
router.get("/", function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
       if(err){
           console.log(err);
       }
        res.render("campgrounds/index",{campgrounds: allCampgrounds, page: 'campgrounds'});
    });
});

// CREATE add new campground to DB
router.post("/", middleware.isLoggedIn, (req, res) => {
    // get data from form and add to campgrounds array
   const name = req.body.name;
   const image = req.body.image;
   const desc = req.body.description;
   const author = {
       id: req.user._id,
       username: req.user.username
   };
    const cost = req.body.cost;
    geocoder.geocode(req.body.location, (err, data) => {
    const lat = data.results[0].geometry.location.lat;
    const lng = data.results[0].geometry.location.lng;
    const location = data.results[0].formatted_address;
    const newCampground = {name: name, image: image, description: desc, cost: cost, author:author, location: location, lat: lat, lng: lng};
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
            console.log(newlyCreated);
            res.redirect("/campgrounds");
        }
    });
  });
});

// NEW
router.get("/new", middleware.isLoggedIn, (req, res) => {
     res.render("campgrounds/new"); 
});

// SHOW
router.get("/:id", (req, res) => {
    Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
       if(err){
            console.log(err);
       } 
            console.log(foundCampground);
            res.render("campgrounds/show", {campground: foundCampground});
    });
});

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id", (req, res) => {
  geocoder.geocode(req.body.location, (err, data) => {
    const lat = data.results[0].geometry.location.lat;
    const lng = data.results[0].geometry.location.lng;
    const location = data.results[0].formatted_address;
    const newData = {name: req.body.name, image: req.body.image, description: req.body.description, cost: req.body.cost, location: location, lat: lat, lng: lng};
    Campground.findByIdAndUpdate(req.params.id, {$set: newData}, (err, campground) => {
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
        }
        req.flash("success","Successfully Updated!");
        res.redirect("/campgrounds/" + campground._id);
    });
  });
});

// DESTROY CAMPGROUND ROUTE 
router.delete("/:id", middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findByIdAndRemove(req.params.id, (err) => {
        if(err){
            res.redirect("/campgrounds");
        }
            res.redirect("/campgrounds");
    });
});

module.exports = router;