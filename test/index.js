const app = require("./../app")
const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();

chai.use(chaiHttp);

// using arrow functions is discouraged in Mocha, 
// `this` cannot access Mocha context
// What is happening to `this` to cause the issue?
describe("site", function() {
    // Describe what you are testing
    it("Should have home page", function(done) {
        // Describe what should happen next
        // In this case, we test that the homepage loads
        chai
            .request(app)
            .get("/")
            .end(function(err, res) {
                if (err) {
                    return done(err);
                }
                res.status.should.be.equal(200);
                return done(); // Call done if test is completed
            });
    });
});