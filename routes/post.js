import { Router } from "express";

const router = Router();
const Post = require("../models/post");

// router.use(express.json());

router.get("/index", (req, res) => {
    Post.find({})
        .then(posts => {
            posts = JSON.parse(JSON.stringify(posts))
            res.render("posts-index", { posts });
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

export default router;
