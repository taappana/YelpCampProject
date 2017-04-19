const express   = require("express"),
      router    = express.Router(),
      User      = require("../models/user"),
      passport  = require("passport");

// ROOT ROUTE
router.get("/", (req, res) => {
   res.render("landing"); 
});

// SHOW REGISTER FORM
router.get("/register", (req, res) => {
    res.render("register"); 
});

// HANDLE SIGNUP LOGIC
router.post("/register", (req, res) => {
    const newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err, user) => {
        if(err){
            console.log(err);
            return res.render("register");
        }
            passport.authenticate("local")(req, res, () => {
                res.redirect("/campgrounds");
            });
    });
});

// SHOW LOGIN FORM
router.get("/login", (req, res) => {
    res.render("login");
});

// HANDLING LOGIN LOGIC
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), (req, res) => {
});

// LOGOUT ROUTE
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/campgrounds");
});

// middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
        res.redirect("/login");
}

module.exports = router;