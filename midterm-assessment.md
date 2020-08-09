# Assessment 1 Study Guide

### Node & Express

- Write a route in Express to display plain text or JSON using `res.send`
    ```js
    app.get('/', (req, res) => {
        res.send('Hello world!');
    });
    ```
- Render a Handlebars template using `res.render`
    ```js
    router.get("/", (req, res) => {
        res.render("index");
    });
    ```
- Write a route that accepts data as a route variable, e.g. `/posts/1`, and use `req.params` to retrieve the data
    ```js
    router.get("/posts/:id", (req, res) => {
        const id = req.params.id;
    })
    ```
- Write a route that accepts data as a query parameter, e.g. `/posts?id=1`, and use `req.body` to retrieve the data
    ```js
    router.post("/posts?id=1", (req, res) => {
        const post = req.body;
    })
    ```
- Use multiple Express routers to create nested routes
- Explain the purpose of middleware and give an example of Express middleware

### Handlebars

- Use `{{#each LIST_OF_ITEMS}}` and `{{/each}}` to loop over a list of items in a Handlebars template
    ```html
    {{#each posts}}
        <li class="list-group-item">
            <div class="lead"><a href="/posts/{{this._id}}">{{this.title}}</a></div>
            <a href="{{this.url}}" target="_blank">{{this.url}}</a>
            <div class="text-right">
                <a href="/n/{{this.subreddit}}">{{this.subreddit}}</a>
            </div>
        </li>
    {{/each}}
    ```
- Use `{{#if CONDITION}}` and `{{/if}}` to conditionally display data in a Handlebars template

### Databases & Schema Design

- Write a Mongoose schema and model for a given scenario (e.g. create an `Event` class with 3 fields to represent an event)
    ```js
    const EventSchema = new Schema({
        name: { type: String, required: true },
        description: { type: String, required: true },
        date: {type: Date, required: true}
    })
    module.exports = mongoose.model("Event", EventSchema);
    ```
- Write schema fields with various data types (string, int, boolean, Date, etc)
    ```js
    const UserSchema = new Schema({
        username: { type: String, required: true },
        age: { type: Number },
        likesDogs: { type: Boolean, default: true }
    })
    module.exports = mongoose.model("User", UserSchema);
    ```
- Use queries such as `find`, `findOne`, `create`, `updateOne`, and `deleteOne` to CRUD objects in the database
    ```js
        User.find({});
        User.findOne({ "username": "taddrita" })

        // create an object
        // 1
        const new_user  = new User({
            username: "makeschool",
            likesDogs: true
        })
        new_user.save((err, user) => {
            // do something
        })
        // 2
        new_user = User.create({
            username: "makeschool",
            likesDogs: true
        }, function(err, user) {
            // do something
        })
    ```
- Use the `ref` field option to create relationships between models
    ```js
    const PostSchema = new Schema({
        title: { type: String, required: true },
        url: { type: String, required: true },
        summary: { type: String, required: true },
        comments: [{ type:Schema.Types.ObjectId, ref: "Comment" }],
    });
    ```