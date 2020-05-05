require('dotenv').config()
const app = require('../server.js')
const mongoose = require('mongoose')
const chai = require('chai')
const chaiHttp = require('chai-http')
const assert = chai.assert

const User = require('../models/user.js')
const Message = require('../models/message.js')

chai.config.includeStack = true

const expect = chai.expect
const should = chai.should()
chai.use(chaiHttp)

/**
 * root level hooks
 */
after((done) => {
  // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
  mongoose.models = {}
  mongoose.modelSchemas = {}
  mongoose.connection.close()
  done()
})

const SAMPLE_USER_ID = "1234567890AB"
const SAMPLE_MESSAGE_ID = "1234567890CD"

describe('Message API endpoints', () => {
    beforeEach((done) => {
        // add any beforeEach code here
        const sampleUser = new User({
            username: "happy",
            password: "coolstuff123",
            _id: SAMPLE_USER_ID
        })
        // sampleUser.save()
        // .then(user => {
        //     return user._id
        // })
        const sampleMessage = new Message({
            title: "Make School",
            body: "Make School is awesome!",
            author: SAMPLE_USER_ID,
            _id: SAMPLE_MESSAGE_ID
        })

        Promise.all([
            sampleUser.save(),
            sampleMessage.save()]
        )
        .then(() => {
            done()
        })
        // console.log(sampleUser, sampleMessage)
    })

    afterEach((done) => {
        // add any afterEach code here
        deleteMessage = Message.deleteOne({ _id: SAMPLE_MESSAGE_ID })
        deleteUser = User.deleteOne( {_id: SAMPLE_USER_ID })
        // deleteMessages = Message.deleteMany( { title: ["Make School", "Test message 2"] })
        
        Promise.all([deleteMessage, deleteUser])
        .then(() => {
            done()
        })
    })

    it('should load all messages', (done) => {
        chai.request(app)
        .get("/messages")
        .end((err, res) => {
            if (err) { done(err) }
            expect(res).to.have.status(200)
            expect(res.body.messages).to.be.an("array")
            done()
        })
    })

    it('should get one specific message', (done) => {
        chai.request(app)
        .get(`/messages/${SAMPLE_MESSAGE_ID}`)
        .end((err, res) => {
            if (err) { done(err) }
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('object')
            expect(res.body.title).to.equal("Make School")
            done()
        })
    })

    it('should post a new message', (done) => {
        // TODO: Complete this
        chai.request(app)
        .post("/messages")
        .send({ 
            title: "Test message 2",
            body: "Testing post route",
            author: SAMPLE_USER_ID
        })
        .end((err, res) => {
            if (err) { done(err) }
            // console.log(res.body)
            expect(res.body).to.be.an("object")
            expect(res.body).to.have.property("title", "Test message 2")

            // check that message is actually inserted into database
            Message.findOne({ title: "Test message 2"})
            .then(message => {
                expect(message).to.be.an("object")
                done()
            })
        })
    })

    it('should update a message', (done) => {
        // TODO: Complete this
        chai.request(app)
        .put(`/messages/${SAMPLE_MESSAGE_ID}`)
        .send({ 
            title: "Test message 3", 
            body: "Testing put route"
        })
        .end((err, res) => {
            if (err) { done(err) }
            expect(res.body).to.be.an("object")
            // console.log("I run", res.body)
            expect(res.body).to.have.property("title", "Test message 3")
            expect(res.body).to.have.property("body", "Testing put route")

            // check that message has been updated in database
            Message.findOne({title: "Test message 3"})
            .then(message => {
                expect(message).to.have.property("body", "Testing put route")
                done()
            })
        })
    })

    it('should delete a message', (done) => {
        // TODO: Complete this
        done()
    })
})
