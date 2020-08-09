const express = require("express")
const router = express.Router({ mergeParams: true });

let Post = require("../models/post");
let Comment = require("../models/comment");
let User = require("../models/user");

router.get("/new", (req, res) => {
    let post;
    let currentUser = req.user;
    Post.findById(req.params.postId).lean()
        .then(p => {
            // console.log("I am post", p)
            post = p;
            return Comment.findById(req.params.commentId).lean();
        })
        .then(comment => {
            // console.log(post)
            // console.log(post.toJSON())
            res.render("replies-new", { post, comment, currentUser });
        })
        .catch(err => {
            console.log(err.message);
        });
});

// create reply
router.post("/", (req, res) => {
    // console.log(req.body);
    const reply = new Comment(req.body);
    reply.author = req.user._id
    Post.findById(req.params.postId)
        .then(post => {
            Promise.all([
                reply.save(),
                Comment.findById(req.params.commentId)
            ])
            .then(([reply, comment]) => {
                comment.comments.unshift(reply._id);
                return Promise.all([
                    comment.save(),
                ]);
            })
            .then(() => {
                res.redirect(`/posts/${req.params.postId}`);
            })
            .catch(console.error);
        return post.save()
    })
})

module.exports = { router }