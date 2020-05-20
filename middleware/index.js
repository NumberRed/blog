var Post                = require("../models/posts"),
    Comment				= require("../models/comments")

var middlewareObj = {};

middlewareObj.checkPostOwnership = function(req, res, next) {
	if(req.isAuthenticated()) {
		Post.findById(req.params.id, function(err, foundPost) {
			if(err) {
				req.flash("error", "Post not found!")
				res.redirect("back");
			} else {
				if(foundPost.author.id.equals(req.user._id)) {
					next();
				} else {
					req.flash("error", "You do not have permission to do that.")
					res.redirect("back");
				}
			}
		})
	} else {
		req.flash("error", "You need to be logged in to do that.")
		res.redirect("back");
	}

}

middlewareObj.checkCommentOwnership = function(req, res, next) {
	if(req.isAuthenticated()) {
		Comment.findById(req.params.comment_id, function(err, foundComment) {
			if(err) {
				res.redirect("back");
			} else {
				if(foundComment.author.id.equals(req.user._id)) {
					next();
				} else {
					req.flash("error", "You do not have permission to do that.")
					res.redirect("back");
				}
			}
		})
	} else {
		req.flash("error", "You need to be logged in to do that.")
		res.redirect("back");
	}

}

middlewareObj.isLoggedIn = function(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	req.flash("error", "You need to be logged in to do that.")
	res.redirect("/login");

}

module.exports = middlewareObj;