const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");

router.get("/sign-up", (req, res) => {
    res.render("sign-up");
})

router.post("/sign-up", (req, res) => {
    const user = new User(req.body);
    user
        .save()
        .then(user => {
            var token = jwt.sign(
                { _id: user._id },
                process.env.SECRET, 
                { expiresIn: "60 days" }
            )
            res.cookie("nToken", token, { maxAge: 900000, httpOnly: true });
            res.redirect("/");
        })
        .catch(err => {
            console.log(err.message);
            return res.status(400).send({ err: err });
        });
});

router.get("/login", (req, res) => {
    res.render("login");
})

router.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // find user
    User.findOne({ username }, "username password")
    .then(user => {
        if (!user) {
            // user not found
            return res.status(401).send({ message: "Wrong username or password "});
        }
        // check password
        user.comparePassword(password, (err, isMatch) => {
            if (!isMatch) {
                // password does not match
                return res.status(401).send({ message: "Wrong username or password "}); 
            }
            // create a token
            const token = jwt.sign({ _id: user._id, username: user.username }, process.env.SECRET, {
                expiresIn: "60 days"
            });
            // set a cookie and redirect to root
            res.cookie("nToken", token, { maxAge: 900000, httpOnly: true });
            res.redirect("/");
        })
    })
    .catch(err => {
        console.log(err);
    })
})

router.get("/logout", (req, res) => {
    res.clearCookie("nToken");
    res.redirect("/");
});

module.exports = router;