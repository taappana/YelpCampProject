const express    = require("express"),
      router     = express.Router(),
      Campground = require("../models/campground");

// INDEX
router.get("/", (req, res) => {
    Campground.find({}, (err, campgrounds) => {
       if(err){
            console.log(err);
       }
            res.render("campgrounds/index", {campgrounds: campgrounds});
    });
});

// CREATE add new campground to DB
router.post("/", isLoggedIn, (req, res) => {
    // get data from form and add to campgrounds array
   const name = req.body.name;
   const image = req.body.image;
   const desc = req.body.description;
   const author = {
       id: req.user._id,
       username: req.user.username
   }
   const newCampground = {name: name, image: image, description: desc, author: author};
   // create a new camground and save to DB
   Campground.create(newCampground, (err, newlyCreated) => {
       if(err){
            console.log(err);
       } 
            // redirect back to campgrounds page
            res.redirect("/campgrounds");
   });
});

// NEW
router.get("/new", isLoggedIn, (req, res) => {
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

// middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
        res.redirect("/login");
}

module.exports = router;