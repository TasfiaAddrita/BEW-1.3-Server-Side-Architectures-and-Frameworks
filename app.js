import "dotenv/config";
import express from "express";
import exphbs from "express-handlebars";
import expressValidator from "express-validator";

import routes from "./routes"
require("./data/reddit-db");

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
// app.use("/posts", routes.comment);

// paths
app.get("/", (req, res) => {
    // res.render("index");
    return res.redirect("/posts/index");
});


app.get("/n/:subreddit", function (req, res) {
    // console.log(req.params.subreddit);
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