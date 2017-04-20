const express    = require("express"),
      router     = express.Router({mergeParams: true}),
      Campground = require("../models/campground"),
      Comment    = require("../models/comment");

// COMMENT NEW
router.get("/new", isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if(err){
            console.log(err);
        }
            res.render("comments/new", {campground: campground}); 
    });
});

// COMMENT CREATE
router.post("/", isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
       if(err){
            console.log(err);
            res.redirect("/campgrounds");
       } 
            Comment.create(req.body.comment, (err, comment) => {
                if(err){
                    console.log(err);
                }   
                    // add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    // save comment
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campgrounds/' + campground._id);
        });         
    }); 
});

// COMMENT EDIT ROUTE
router.get("/:comment_id/edit", (req, res) => {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
        if(err){
            res.redirect("back");
        }
        res.render("comments/edit", {campground_id: req.params.id, comment: foundComment}); 
    });
});

// COMMENT UPDATE ROUTE
router.put("/:comment_id", (req, res) => {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, foundComment) => {
       if(err){
           res.redirect("back");
       } 
        res.redirect("/campgrounds/" + req.params.id);
    });
});

// COMMENT DESTROY ROUTE
router.delete("/:comment_id", (req, res) => {
    Comment.findByIdAndRemove(req.params.comment_id, (err) => {
       if(err){
           res.redirect("back");
       } 
       res.redirect("/campgrounds/" + req.params.id);
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