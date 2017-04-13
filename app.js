const express    = require("express"),
      app        = express(),
      bodyParser = require("body-parser"),
      mongoose   = require("mongoose"),
      Campground = require("./models/campground"),
      Comment    = require("./models/comment"),
      seedDB     = require("./seeds");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
seedDB();

app.get("/", (req, res) => {
   res.render("landing"); 
});

app.get("/campgrounds", (req, res) => {
    Campground.find({}, (err, campgrounds) => {
       if(err){
            console.log(err);
       }
            res.render("campgrounds/index", {campgrounds: campgrounds});
    });
});

app.post("/campgrounds", (req, res) => {
   const name = req.body.name;
   const image = req.body.image;
   const desc = req.body.description;
   const newCampground = {name: name, image: image, description: desc};
   Campground.create(newCampground, (err, newlyCreated) => {
       if(err){
            console.log(err);
       } 
            res.redirect("/campgrounds");
   });
});

app.get("/campgrounds/new", (req, res) => {
     res.render("campgrounds/new"); 
});

app.get("/campgrounds/:id", (req, res) => {
    Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
       if(err){
            console.log(err);
       } 
            console.log(foundCampground);
            res.render("campgrounds/show", {campground: foundCampground});
    });
});

// =================================
// COMMENTS ROUTES
// =================================

app.get("/campgrounds/:id/comments/new", (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if(err){
            console.log(err);
        }
            res.render("comments/new", {campground: campground}); 
    });
});

app.post("/campgrounds/:id/comments", (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
       if(err){
            console.log(err);
            res.redirect("/campgrounds");
       } 
            Comment.create(req.body.comment, (err, comment) => {
                if(err){
                    console.log(err);
                }   
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campgrounds/' + campground._id);
        });         
    }); 
});

app.listen(process.env.PORT, process.env.IP, () => {
    console.log("The Yelpcamp server has started!");
});