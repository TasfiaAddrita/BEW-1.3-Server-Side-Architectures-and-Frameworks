import { Router } from "express";

const router = Router({ mergeParams: true });
const Post = require("../models/post");
const Comment = require("../models/comment");

router.post("/", function(req, res) {
    const comment = new Comment(req.body);
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
            return res.redirect("/");
        })
        .catch(err => {
            console.log(err);
        });
});

export default router;