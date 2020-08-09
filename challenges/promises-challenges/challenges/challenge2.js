/*
 *******************************************************************************
 * INSTRUCTIONS:
 * Follow the steps below and answer the discusssion questions that follow.
 * 
 * 1. Read over the code that follows. What will be printed to the console when
 *    it runs? Run the code using `node challenge2.js` and verify that your
 *    expectation was correct.
 * 
 * Answer:
 *      Hello there Ducky
 *      MAKE SCHOOL IS AWESOME!!!
 * 
 * 2. What happens if greet() fails? Make it fail by changing 'name' to a number
 *    instead of a string. What happens? Does uppercaser() still run?
 * 
 * Answer: uppercaser() will not run, the program will go straight to the .catch 
 *         statement and print the reject statement in greet()
 *      Received an error!
 *      Name must be a string!
 * 
 * 3. What happens if greet() succeeds and uppercaser() fails? Modify your code
 *    to achieve this result by changing the values of 'name' and 'my_str' and
 *    run the code again.
 * 
 * Answer: greet() and uppercaser() will run, but it will go straight to the .catch statement
 *         and print the reject statement in uppercaser()
 *      Hello there, Ducky
 *      Received an error!
 *      Argument to uppercaser must be string
 * 
 * 4. Write a method that takes a string as input and returns the input string
 *    with a space added between each character. E.g. 'foo' -> 'f o o'
 * 
 *    Name this method spacer(str). It should run asynchronously, so use a 
 *    setTimeout() and return a Promise.
 * 
 *    Last, call spacer() after you call greeter() and uppercaser().
 * 
 *    Make sure you only have one catch() block. If you have more than one,
 *    refactor your code so that you only have one. 
 * 
 *******************************************************************************
 */

 /**
  * Asynchronously returns a greeting for a specified name.
  * @param name The name of the person to greet.
  */
function greet(name) {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
            if (typeof name === 'string') { 
            resolve('Hello there, ' + name);
            } else {
            reject('Name must be a string!');
            }
      }, 1000);
    });
}

/**
 * Returns the uppercased version of a string.
 * @param {*} str The string to uppercase.
 */
function uppercaser(str) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            if (typeof str === 'string') {
                resolve(str.toUpperCase());
            } else {
                reject('Argument to uppercaser must be string');
            }
        }, 1500);
    });
}

/**
 * Returns spaces between the string
 * @param {*} str The string to add spaces to
 */
function spacer(str) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            if (typeof str === 'string') {
                resolve(str.split('').join(' '));
            } else {
                reject("The argument should be a string!!!");
            }
        }, 2000);
    });
}

name = 'Ducky'
// name = 5
my_str = 'Make School is Awesome!!!'
// my_str = 10

greet(name)
    .then((greetResult) => {
        console.log(greetResult);
        return uppercaser(my_str);
    })
    .then((uppercaserResult) => {
        console.log(uppercaserResult);
        return spacer(uppercaserResult);
    })
    .then((spaceResult) => {
        console.log(spaceResult);
    }).catch((err) => {
        console.log('Received an error!')
        console.log(err);
    })
