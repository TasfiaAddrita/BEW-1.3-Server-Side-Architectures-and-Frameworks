const express = require("express")
const router = express.Router();
const Post = require("../models/post");
const User = require("../models/user");
const comment = require("./comment")

router.get("/index", (req, res) => {
    let currentUser = req.user;
    Post.find({}).populate("author")
        .then(posts => {
            posts = JSON.parse(JSON.stringify(posts))
            res.render("posts-index", { posts, currentUser });
        })
        .catch(err => {
            console.log(err.message);
        });
});

router.get("/new", (req, res) => {
  res.render("posts-new");
});

router.post("/new", (req, res) => {
    console.log("user", req.user)
    if (req.user) {
        const post = new Post(req.body);
        post.author = req.user._id;
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
        // .populate({
        //     path: "comments",
        //     populate: {
        //         path: "author"
        //     }
        // }).populate("author")
        .populate("comments").lean()
        .then(post => {
            post = JSON.parse(JSON.stringify(post));
            res.render("posts-show", { post, currentUser })
        })
        .catch(err => {
            console.log(err);
        });
});

router.use("/:postId/comments", comment.router)

module.exports = router;
