const express = require("express")
const router = express.Router();
const Post = require("../models/post");
const User = require("../models/user");
const comment = require("./comment")

router.get("/index", (req, res) => {
    let currentUser = req.user;
    Post.find({}).sort({ updatedAt: -1 }).populate("author")
        .then(posts => {
            posts = JSON.parse(JSON.stringify(posts))
            res.render("posts-index", { posts, currentUser });
        })
        .catch(err => {
            console.log(err.message);
        });
});

router.get("/new", (req, res) => {
    let currentUser = req.user;
    res.render("posts-new", { currentUser });
});

router.post("/new", (req, res) => {
    if (req.user) {
        const post = new Post(req.body);
        post.author = req.user._id;
        post.upVotes = [];
        post.downVotes = [];
        post.voteScore = 0;
        post.save()
            .then(post => {
                return User.findById(req.user._id);
            })
            .then(user => {
                user.posts.unshift(post);
                user.save()
                return res.redirect(`/posts/${post._id}`);
            })
            .catch(err => {
                console.log(err.message);
            })
    } else {
        return res.status(401); // UNAUTHORIZED
    }
});

router.get("/:id", (req, res) => {
    let currentUser = req.user;
    Post.findById(req.params.id)
        .populate("comments").lean()
        .then(post => {
            post = JSON.parse(JSON.stringify(post));
            res.render("posts-show", { post, currentUser })
        })
        .catch(err => {
            console.log(err);
        });
});

router.put("/:id/vote-up", function (req, res) {
    let currentUser = req.user;
    console.log("i should be current user", currentUser)
    Post.findById(req.params.id).exec(function (err, post) {
        console.log("I pass", post)
        // post.upVotes.push(req.user._id);
        post.voteScore = post.voteScore + 1;
        post.save();

        res.status(200);
    });
});

router.put("/:id/vote-down", function (req, res) {
    Post.findById(req.params.id).exec(function (err, post) {
        post.downVotes.push(req.user._id);
        post.voteScore = post.voteScore - 1;
        post.save();

        res.status(200);
    });
});

router.use("/:postId/comments", comment.router)

module.exports = router;
