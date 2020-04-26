const express = require("express")
const router = express.Router();
const Post = require("../models/post");
const comment = require("./comment")

router.get("/index", (req, res) => {
    let currentUser = req.user;
    Post.find({})
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
    // console.log(req.body)
    const post = new Post(req.body);

    post.save((err, post) => {
        return res.redirect('/');
    })
});

router.get("/:id", (req, res) => {
    Post.findById(req.params.id).populate("comments")
        .then(post => {
            post = JSON.parse(JSON.stringify(post));
            res.render("posts-show", { post })
        })
        .catch(err => {
            console.log(err);
        });
});

router.use("/:postId/comments", comment.router)

// router.post("/:postId/comments", function (req, res) {
//     const comment = new Comment(req.body);
//     comment
//         .save()
//         .then(comment => {
//             return res.redirect("/");
//         })
//         .catch(err => {
//             console.log(err);
//         });
// });

// export default router;
module.exports = router;
