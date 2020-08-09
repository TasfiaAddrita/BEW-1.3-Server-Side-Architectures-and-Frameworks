const express = require("express")
const router = express.Router({ mergeParams: true });
const Post = require("../models/post");
const Comment = require("../models/comment");
const User = require("../models/user");
const reply = require("./replies")

router.post("/", function(req, res) {
    const comment = new Comment(req.body);
    comment.author = req.user._id;
    comment
        .save()
        .then(comment => {
            return Promise.all([
                Post.findById(req.params.postId)
            ]);
        })
        .then(([post, user]) => {
            post.comments.unshift(comment);
            return Promise.all([
                post.save()
            ]);
        })
        .then(post => {
            res.redirect(`/posts/${req.params.postId}`);
        })
        .catch(err => {
            console.log(err);
        });
});

router.use("/:commentId/replies", reply.router)

module.exports = { router };
