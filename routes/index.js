const express   = require("express"),
      router    = express.Router(),
      User      = require("../models/user"),
      passport  = require("passport");

// ROOT ROUTE
router.get("/", (req, res) => {
   res.render("landing"); 
});

// show register form
router.get("/register", function(req, res){
   res.render("register", {page: 'register'}); 
});

// HANDLE SIGNUP LOGIC
router.post("/register", (req, res) => {
    const newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err, user) => {
        if(err){
            return res.render("register", {"error": err.message});
        }
            passport.authenticate("local")(req, res, () => {
                req.flash("success", "Welcome to YelpCamp " + user.username);
                res.redirect("/campgrounds");
            });
    });
});

//show login form
router.get("/login", function(req, res){
   res.render("login", {page: 'login'}); 
});

// HANDLING LOGIN LOGIC
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds", 
        failureRedirect: "/login",

failureFlash: true

    }), function(req, res){
});

// LOGOUT ROUTE
router.get("/logout", (req, res) => {
    req.logout();
    req.flash("success", "Logged You Out!");
    res.redirect("/campgrounds");
});

module.exports = router;