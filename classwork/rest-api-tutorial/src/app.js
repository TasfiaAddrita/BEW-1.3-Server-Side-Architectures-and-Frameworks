import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import uuidv4 from 'uuid/v4';

import models from './models';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
    req.context = {
        models,
        me: models.users[1],
    };
    next();
});
app.use("/session", routes.session);
app.use("/users", routes.user);
app.use("/messages", routes.message);

// ------------------ index ------------------

app.get('/', (req, res) => {
    // res.send('Hello world!');
    return res.send('Received a GET HTTP method');
});

app.post('/', (req, res) => {
    return res.send('Received a POST HTTP method');
});

app.put('/', (req, res) => {
    return res.send('Received a PUT HTTP method');
});

app.delete('/', (req, res) => {
    return res.send('Received a DELETE HTTP method');
});

// ------------------------------------------------------
app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}`)
)

// console.log('Hello over running Node.js project.')
// console.log(process.env.MY_SECRET)