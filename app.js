require("dotenv/config");
require("./data/reddit-db");

const express = require("express");
const exphbs = require("express-handlebars");
const expressValidator = require("express-validator");
const cookie = require("cookie-parser");
const jwt = require("jsonwebtoken");

const routes = require("./routes")
const Post = require("./models/post");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressValidator());

// middleware
app.set("view engine", "hbs")
app.engine("hbs", exphbs({ 
    extname: 'hbs',
    defaultLayout: "main",
}));

// routes
app.use("/posts", routes.post);
app.use("/", routes.auth)

// paths
app.get("/", (req, res) => {
    // res.render("index");
    return res.redirect("/posts/index");
});


app.get("/n/:subreddit", function (req, res) {
    Post.find({ subreddit: req.params.subreddit }).lean()
        .then(posts => {
            res.render("posts-index", { posts });
        })
        .catch(err => {
            console.log(err);
        })
})


app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}`)
);

module.exports = app