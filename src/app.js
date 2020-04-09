import "dotenv/config";
import express from "express";
import exphbs from "express-handlebars";

const app = express();

// middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars')

app.get("/", (req, res) => {
//   return res.send("Hello world!");
    res.render('index');
});

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}`)
);