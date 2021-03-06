require("dotenv/config");
require("./data/reddit-db");

const express = require("express");
const exphbs = require("express-handlebars");
const expressValidator = require("express-validator");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const path = require("path")

const routes = require("./routes")
const Post = require("./models/post");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));

// middleware
app.set("view engine", "hbs")
app.engine("hbs", exphbs({ 
    extname: 'hbs',
    defaultLayout: "main",
    // partialsDir: __dirname + '/views/partials/'
}));

// auth middleware
let checkAuth = (req, res, next) => {
    // console.log("Checking authentication");
    if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
        req.user = null;
    } else {
        let token = req.cookies.nToken;
        let decodedToken = jwt.decode(token, { complete: true } || {});
        req.user = decodedToken.payload;
    }
    next();
}
app.use(checkAuth);

// routes
app.use("/posts", routes.post);
app.use("/", routes.auth)

// paths
app.get("/", (req, res) => {
    return res.redirect("/posts/index");
});

app.get("/n/:subreddit", function (req, res) {
    let currentUser = req.user;
    Post.find({ subreddit: req.params.subreddit }).lean()
        .then(posts => {
            res.render("posts-index", { posts, currentUser });
        })
        .catch(err => {
            console.log(err);
        })
})

// app.put("posts/:id/vote-up", function (req, res) {
//     Post.findById(req.params.id).exec(function (err, post) {
//         console.log("I pass")
//         post.upVotes.push(req.user._id);
//         post.voteScore = post.voteScore + 1;
//         post.save();

//         res.status(200);
//     });
// });

// app.put("posts/:id/vote-down", function (req, res) {
//     Post.findById(req.params.id).exec(function (err, post) {
//         post.downVotes.push(req.user._id);
//         post.voteScore = post.voteScore - 1;
//         post.save();

//         res.status(200);
//     });
// });

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}`)
);

module.exports = app