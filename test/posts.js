const app = require("./../app");
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

// Import Post model
const Post = require("../models/post");

chai.should();
chai.use(chaiHttp);

function makePostRequest(initialDocCount, post, status) {
    chai
      .request(app)
      .post("/posts/new")
      .set("content-type", "application/x-www-form-urlencoded")
      .send(post)
      .then(function (res) {
        Post.estimatedDocumentCount()
          .then(function (newDocCount) {
            expect(res).to.have.status(200);
            expect(newDocCount).to.be.equal(initialDocCount + 1);
            done();
          })
          .catch(function (err) {
            done(err);
          })
          .catch(function (err) {
            done(err);
          });
      });
}

describe("Posts", function() {
    const agent = chai.request.agent(app);
    const newPost = {
        title: "post title",
        url: "https://www.google.com",
        summary: "post summary",
        subreddit: "test"
    };
    // const newPostFail = {
    //     url: "https://www.google.com",
    //     summary: "post summary"
    // };
    it("should create with valid attributes at POST /posts/new", function(done) {
        Post.estimatedDocumentCount()
            .then(function(initialDocCount) {
                chai
                    .request(app)
                    .post("/posts/new")
                    .set("content-type", "application/x-www-form-urlencoded")
                    .send(newPost)
                    .then(function(res) {
                        Post.estimatedDocumentCount()
                            .then(function(newDocCount) {
                                expect(res).to.have.status(200);
                                expect(newDocCount).to.be.equal(initialDocCount + 1);
                                done();
                            }).catch(function(err) {
                                done(err);
                            })
                        .catch(function(err) {
                            done(err);
                        });
                    })
            .catch(function(err) {
                done(err);
            });
        });
    });
    after(function() {
        Post.findOneAndDelete(newPost);
    });
});