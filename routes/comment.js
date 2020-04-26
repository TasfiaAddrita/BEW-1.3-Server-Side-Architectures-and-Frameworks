const express = require("express")
const router = express.Router({ mergeParams: true });
const Post = require("../models/post");
const Comment = require("../models/comment");

router.post("/", function(req, res) {
    const comment = new Comment(req.body);
    // console.log(req.body.postId)
    comment
        .save()
        .then(comment => {
            return Post.findById(req.params.postId);
        })
        .then(post => {
            post.comments.unshift(comment);
            return post.save();
        })
        .then(post => {
            return res.redirect(`/posts/${post.id}`);
        })
        .catch(err => {
            console.log(err);
        });
});

module.exports = { router };
