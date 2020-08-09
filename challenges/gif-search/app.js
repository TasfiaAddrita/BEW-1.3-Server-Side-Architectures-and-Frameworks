// libraries
const express = require('express');
const exphbs = require('express-handlebars')
const https = require("https");
require("dotenv").config();

// app setup
const app = express();

// middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars')

// tenor
const Tenor = require('tenorjs').client({
    "Key": process.env.TENOR_API_KEY,
    "Filter": "high",
    "Locale": "en_US",
});

// routes
app.get('/', (req, res) => {
    // set the gif url
    // const gifUrl = 'https://media1.tenor.com/images/561c988433b8d71d378c9ccb4b719b6c/tenor.gif?itemid=10058245';
    // render the hello-gif view, passing the gifUrl into the view to be displayed
    // res.render('hello-gif', { gifUrl })

    term = ""
    if (req.query.term) {
        term = req.query.term
    }

    // pulling gifs from tenor js wrapper
    // Tenor.Search.Query(term, "10")
    //     .then(response => {
    //         const gifs = response;
    //         res.render('home', { gifs })
    //     }).catch(console.error)
    
    // pulling gifs from tenor api via http
    https.get(`https://api.tenor.com/v1/search?key=${process.env.TENOR_API_KEY}&q=${term}`, (response) => {
        let data = "";    

        // a chunk of data has been received
        response.on('data', (chunk) => {
            data += chunk;
        });

        // the whole response has been received, return the result
        response.on('end', () => {
            let gifs = JSON.parse(data).results;
            res.render("home", { gifs });
        });
    }).on('error', (err) => {
        console.log("Error: " + err.message);
    });

});

app.get('/greetings/:name', (req, res) => {
    // grab the name from the path provided
    const name = req.params.name;
    // render the greetings view with the name
    res.render('greetings', { name });
});

// start server
app.listen(3000, () => {
    console.log('gif search listening on port localhost:3000')
});