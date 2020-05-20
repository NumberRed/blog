var express     = require("express"),
    router      = express.Router(),
    passport    = require("passport"),
    User        = require("../models/users")

router.get("/", function(req, res) {
	res.render("landing");
});

router.get("/register", function(req, res) {
	res.render("users/register");
});

router.post("/register", function(req, res) {
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err) {
			console.log(err);
			req.flash("error", err.message + ".")
			return res.render("users/register");
		}
		passport.authenticate("local")(req, res, function() {
			req.flash("success", "Successfully registered account! Welcome " + user.username);
			res.redirect("/posts");
		})
	});
});

router.get("/login", function(req, res) {
	res.render("users/login");
});

router.post("/login", passport.authenticate("local", 
	{
		successRedirect: "/posts",
		failureRedirect: "/login"
	}), function(req, res) {
	
});

router.get("/logout", function(req, res) {
	req.logout();
	req.flash("success", "Successfully logged out!");
	res.redirect("/posts");
});

module.exports = router;