const app = require("./../app");
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

// Import Post model
const Post = require("../models/post");
const User = require("../models/user");

chai.should();
chai.use(chaiHttp);

// Posts collection is starting with one document
// {
//     comments: [ 5ea6415f7a55104a7b040851 ],
//     _id: 5ea640fb7a55104a7b040850,
//     title: 'i am a post',
//     url: 'https://www.google.com',
//     summary: 'i am a post with an author and also with comments',
//     subreddit: 'comments',
//     author: 5ea5ebf37c1dbf3cbbb73cf3,
//     updatedAt: 2020-04-27T02:20:15.178Z,
//     createdAt: 2020-04-27T02:18:35.079Z,
//     __v: 1
// }

describe("Posts", function() {
    const agent = chai.request.agent(app);
    const newPost = {
        title: "post title",
        url: "https://www.google.com",
        summary: "post summary",
        subreddit: "test"
    };
    const user = {
        firstName: "hello",
        lastName: "world",
        username: "postsTest",
        password: "testPosts"
    };
    
    before(function (done) {
      agent
        .post("/sign-up")
        .set("content-type", "application/x-www-form-urlencoded")
        .send(user)
        .then(function (res) {
          done();
        })
        .catch(function (err) {
          done(err);
        });
    });

    after(function (done) {
        Post.findOneAndDelete(newPost)
            .then(function (res) {
                agent.close()

                User.findOneAndDelete({
                    username: user.username
                })
                    .then(function (res) {
                        done();
                    })
                    .catch(function (err) {
                        done(err);
                    });
            })
            .catch(function (err) {
                done(err);
            });
    });

    it('Should create with valid attributes at POST /posts/new', function (done) {
        // Checks how many posts there are now
        Post.estimatedDocumentCount()
            .then(function (initialDocCount) {
                agent
                    .post("/posts/new")
                    // This line fakes a form post,
                    // since we're not actually filling out a form
                    .set("content-type", "application/x-www-form-urlencoded")
                    // Make a request to create another
                    .send(newPost)
                    .then(function (res) {
                        Post.estimatedDocumentCount()
                            .then(function (newDocCount) {
                                // Check that the database has one more post in it
                                expect(res).to.have.status(200);
                                // Check that the database has one more post in it
                                expect(newDocCount).to.be.equal(initialDocCount + 1)
                                done();
                            })
                            .catch(function (err) {
                                done(err);
                            });
                    })
                    .catch(function (err) {
                        done(err);
                    });
            })
            .catch(function (err) {
                done(err);
            });
    });
});