import "dotenv/config";
import express from "express";
import exphbs from "express-handlebars";
import expressValidator from "express-validator";

import routes from "./routes"

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

app.use("/posts", routes.post);

app.get("/", (req, res) => {
//   return res.send("Hello world!");
    res.render("index");
});

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}`)
);