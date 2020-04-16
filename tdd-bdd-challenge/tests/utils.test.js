const mocha = require("mocha")
const chai = require("chai")
const utils = require("../utils")
const expect = chai.expect

// ========================================================
// NOTE: https://mochajs.org/#arrow-functions
// Passing arrow functions (“lambdas”) to Mocha is discouraged.
// Lambdas lexically bind this and cannot access the Mocha context.
// ========================================================

it("should say hello", function() {
  const hello = utils.sayHello()
  expect(hello).to.be.a("string")
  expect(hello).to.equal("Hello")
  expect(hello).with.lengthOf(5)
})

// ========================================================
// Level 1 Challenges
// ========================================================

it("should return the area of a 5 by 6 rectangle", function() {
    const area = utils.area(5, 6)
    expect(area).to.be.a("number")
    expect(area).to.equal(30)
})

it("should return the perimeter of a 5 by 6 rectangle", function() {
    const perimeter = utils.perimeter(5, 6)
    expect(perimeter).to.be.a("number")
    expect(perimeter).to.equal(22)
})

it("should return the area of a circle of radius 5", function() {
    const circleArea = utils.circleArea(5)
    expect(circleArea).to.be.a("number")
    expect(circleArea).to.equal(78.53981633974483)
})

// ========================================================
// Level 2 Challenges
// ========================================================
// NOTE: The following unimplemented test cases are examples
// of "Pending Tests" in Chai. Someone should write these
// tests eventually.
//
// NOTE: 
// ========================================================

it("Should create a new (object) Item with name and price", function() {
    const apple = utils.createItem("apple", 0.99)
    expect(apple).to.be.a("object")
    expect(apple).to.have.property("name", "apple")
    expect(apple).to.have.property("price", 0.99)
    expect(apple).to.have.property("quantity", 1)
})

it("Should return shoppingCart as an empty array", function() {
    const shoppingCart = utils.shoppingCart.getAllItems()
    expect(shoppingCart).to.be.a("array")
    expect(shoppingCart).to.have.length(0)
})

it("Should add a new item to the shopping cart", function() {
    const shoppingCart = utils.shoppingCart
    const apple = utils.createItem("apple", 0.99)
    shoppingCart.addItem(apple)
    expect(shoppingCart.items[0]).to.have.property("price", 0.99)
    expect(shoppingCart.items[0]).to.have.property("quantity", 1)
    expect(shoppingCart.getTotalNumItems()).to.equal(1)
})

// items added in shoppingCart previously are still stored even though we're going to a different test/scope and create a new instance of it
// if we try to remove shoppingCart from testing scope, error occurs, so we can condude that it's not pulling shoppingCart from other tests
// I think what's happening is that shoppingCart is an object, not a class, so it doesn't return an empty list of items when called

it("Should return the number of items in the cart", function() {
    const shoppingCart2 = utils.shoppingCart
    // console.log("before items", shoppingCart2.getAllItems()) // why does this shoppingCart access the last shopping cart?
    const apple = utils.createItem("apple", 0.99)
    const banana = utils.createItem("banana", 1.29)
    shoppingCart2.addItem(apple)
    shoppingCart2.addItem(banana)
    shoppingCart2.addItem(banana)
    expect(shoppingCart2.getTotalNumItems()).to.equal(4)
})

it("Should remove items from cart", function() {
    const shoppingCart = utils.shoppingCart
    shoppingCart.removeItem("apple")
    expect(shoppingCart.getTotalNumItems()).to.equal(3)
})

// ========================================================
// Stretch Challenges
// ========================================================

it("Should update the count of items in the cart", function() {
    const shoppingCart = utils.shoppingCart
    shoppingCart.removeItem("banana")
    expect(shoppingCart.getTotalNumItems()).to.equal(2)
})

it("Should validate that an empty cart has 0 items", function() {
    const shoppingCart = utils.shoppingCart
    shoppingCart.removeItem("apple")
    shoppingCart.removeItem("apple")
    expect(shoppingCart.items).to.be.a("array")
    expect(shoppingCart.items).to.have.length(0)
})

it("Should return the total cost of all items in the cart", function() {
    const shoppingCart = utils.shoppingCart
    const apple = utils.createItem("apple", 0.99)
    const banana = utils.createItem("banana", 1.29)
    shoppingCart.addItem(apple)
    shoppingCart.addItem(banana)
    shoppingCart.addItem(banana)
    expect(shoppingCart.getTotalNumItems()).to.equal(3)
    expect(shoppingCart.getTotalPrice()).to.equal(3.57)
})