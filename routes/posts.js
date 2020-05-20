var express     = require("express"),
    router      = express.Router()
	Post        = require("../models/posts")
	middleware	= require("../middleware")

router.get("/posts", function(req, res) {
	Post.find({}, function(err, posts) {
		res.render("posts/posts", {post: posts, currentUser: req.user});
	});
});

router.get("/posts/new", middleware.isLoggedIn, function(req, res) {
	res.render("posts/new");
});

router.post("/posts", middleware.isLoggedIn, function(req, res) {
	req.body.post.body 	= req.sanitize(req.body.post.body);
	var name 			= req.body.post.title,
		image 			= req.body.post.image,
		desc 			= req.body.post.description,
		author			= {id: req.user._id, username: req.user.username},
		newPost 		= {title: name, image: image, description: desc, author: author}
	Post.create(newPost, function(err, createNewPost) {
		if(err) {
			res.render("posts/new");
		} else {
			res.redirect("/posts");
		}
	});
});

router.get("/posts/:id", function(req, res) {
	Post.findById(req.params.id).populate("comments").exec(function(err, foundPost) {
		if(err) {
			res.redirect("/posts");
		} else {
			res.render("posts/show", {post: foundPost});
		}
	})
});

router.get("/posts/:id/edit", middleware.checkPostOwnership, function(req, res) {
	Post.findById(req.params.id, function(err, foundPost) {
		res.render("posts/edit", {post: foundPost})
	})
});

router.put("/posts/:id", middleware.checkPostOwnership, function(req, res) {
	req.body.post.body = req.sanitize(req.body.post.body);
	Post.findByIdAndUpdate(req.params.id, req.body.post, function(err, updatedPost) {
		if(err) {
			res.redirect("/posts");
		} else {
			res.redirect("/posts/" + req.params.id);
		}
	});
});

router.delete("/posts/:id", middleware.checkPostOwnership, function(req, res) {
	Post.findByIdAndRemove(req.params.id, function(err) {
		if(err) {
			res.redirect("/posts")
		} else {
			req.flash("success", "Post removed.")
			res.redirect("/posts")
		}
	});
});

module.exports = router;