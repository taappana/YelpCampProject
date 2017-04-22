const express    = require("express"),
      router     = express.Router({mergeParams: true}),
      Campground = require("../models/campground"),
      Comment    = require("../models/comment"),
      middleware = require("../middleware");

// COMMENT NEW
router.get("/new", middleware.isLoggedIn, (req, res) => {
    // find campground by id
    Campground.findById(req.params.id, (err, campground) => {
        if(err){
            console.log(err);
        }
            res.render("comments/new", {campground: campground}); 
    });
});

// COMMENT CREATE
router.post("/", middleware.isLoggedIn, (req, res) => {
    // lookup campground using id
    Campground.findById(req.params.id, (err, campground) => {
       if(err){
            console.log(err);
            res.redirect("/campgrounds");
       } 
            Comment.create(req.body.comment, (err, comment) => {
                if(err){
                    res.flash("error", "Something went wrong");
                    console.log(err);
                }   
                    // add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    // save comment
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success", "Successfully added a comment");
                    res.redirect('/campgrounds/' + campground._id);
        });         
    }); 
});

// COMMENT EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, (req, res) => {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
        if(err){
            res.redirect("back");
        }
        res.render("comments/edit", {campground_id: req.params.id, comment: foundComment}); 
    });
});

// COMMENT UPDATE ROUTE
router.put("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, foundComment) => {
       if(err){
           res.redirect("back");
       } 
        res.redirect("/campgrounds/" + req.params.id);
    });
});

// COMMENT DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndRemove(req.params.comment_id, (err) => {
       if(err){
           res.redirect("back");
       } 
       req.flash("success", "Comment deleted");
       res.redirect("/campgrounds/" + req.params.id);
    }); 
});

module.exports = router;