var express     = require("express"),
    router      = express.Router(),
    Post        = require("../models/posts"),
	Comment     = require("../models/comments"),
	middleware	= require("../middleware")

router.get("/posts/:id/comments/new", middleware.isLoggedIn, function(req, res) {
	Post.findById(req.params.id, function(err, post) {
		if(err) {
			console.log(err);
		} else {
			res.render("comments/new", {post: post});
		}
	})
});

router.post("/posts/:id/comments", middleware.isLoggedIn, function(req, res) {
	Post.findById(req.params.id, function(err, post) {
		if(err) {
			console.log(err);
			res.redirect("/posts");
		} else {
			Comment.create(req.body.comment, function(err, comment) {
				if(err) {
					req.flash("error", "Something went wrong.")
					console.log(err);
				} else {
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save()
					post.comments.push(comment);
					post.save();
					req.flash("success", "Added new comment!")
					res.redirect("/posts/" + post._id);
				}
			})
		}
	})
});

router.put("/posts/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req, res) {
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
		if(err) {
			res.redirect("back")
		} else {
			res.redirect("/posts/" + req.params.id)
		}
	})
});

router.get("/posts/:id/comments/:comment_id/edit", middleware.checkCommentOwnership, function(req, res) {
	Comment.findById(req.params.comment_id, function(err, foundComment) {
		if(err) {
			res.redirect("back");
		} else {
			res.render("comments/edit", {post_id: req.params.id, comment: foundComment});
		}
	})
});

router.delete("/posts/:id/comments/:comment_id/", middleware.checkCommentOwnership, function(req, res) {
	Comment.findByIdAndRemove(req.params.comment_id, function(err) {
		if(err) {
			res.redirect("/posts")
		} else {
			req.flash("success", "Comment removed.")
			res.redirect("/posts/" + req.params.id)
		}
	});
});

module.exports = router;