/*
 *******************************************************************************
 * INSTRUCTIONS:
 * Follow the steps below and answer the discussion questions that follow.
 * 
 * 1. Read over the code that follows. In what order will the outputs "Step 1",
 *    "Step 2", and "Step 3" be printed? How do you know?
 * 
 * Answer: Step 1, Step 3, Step 2
 * 
 * 2. Run this code using `node challenge1.js`. In what order were the steps
 *    printed?
 * 
 * Answer: Step 1, Step 3, Step 2
 * 
 * 3. Change the delay time in the `snooze` function from 2000 ms to 0. In what
 *    order will the steps be printed now? Why? Re-run the code again to verify
 *    your expectation. Were you correct?
 * 
 * Answer: 
 *      Prediction: Step 1, Step 3, Step 2
 *      Actual: Step 1, Step 3, Step 2
 *          Step 3 still printed before Step 2 because the program will run all the 
 *          following lines until the snooze function is done running. Even though
 *          the timeout is set to 0 seconds, it still takes time to call the snooze
 *          function, call the setTimeout function, run the function passed into snooze.
 *          Once all those functions are complete, then console will print Step 2.
 * 
 *******************************************************************************
 */

/* This function takes a callback as a parameter. */
function snooze(action) {
    setTimeout(function() {
      action();
    }, 0);
}
console.log('Step 1');

snooze(function() {
    console.log('Step 2');
    console.log("Async Action completed via callback");
} );

console.log('Step 3');

