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

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", checkCampgroundOwnership, (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id", checkCampgroundOwnership, (req, res) => {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
        if(err){
            res.redirect("/campgrounds");
        }
            res.redirect("/campgrounds/" + req.params.id);
   }); 
});

// DESTROY CAMPGROUND ROUTE 
router.delete("/:id", checkCampgroundOwnership, (req, res) => {
    Campground.findByIdAndRemove(req.params.id, (err) => {
        if(err){
            res.redirect("/campgrounds");
        }
            res.redirect("/campgrounds");
    });
});

// middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
        res.redirect("/login");
}

function checkCampgroundOwnership(req, res, next) {
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, (err, foundCampground) => {
        if (err){
            res.redirect("back");
        } else {
            // does user own the campground?
            if(foundCampground.author.id.equals(req.user._id)){
                next();
            } else {
                res.redirect("back");
            }
        }
        });
    } else {
        res.redirect("back");
    }
}

module.exports = router;