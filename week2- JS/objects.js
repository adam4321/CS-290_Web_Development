/**********************************************************************
** Author: Adam Wright
** Description: Implementation of the Deep comparison function from ex.4
**              of chapter 4 of Eloquent JavaScript
**********************************************************************/

// Passing all test cases
function deepEqual(obj1, obj2) {

    // Check if the two objects have the same memory address
    if (obj1 === obj2) {
        return true;
    }

    // Check if either is not an object or is null
    if (typeof obj1 != "object" || obj1 == null) {
        return false;
    }

    if (typeof obj2 != "object" || obj2 == null) {
        return false;
    }

    // Loop over each prop in obj1 and see if it is not in obj2
    for (var prop in obj1) {
        if (obj2.hasOwnProperty(prop)) {  
            if (!deepEqual(obj1[prop], obj2[prop])) {
                return false;
            }
        } 
        else {
            return false;
        } 
    } 
    return true;
}


// Test object
let obj = {here: {is: "an"}, object: 2};

// Test cases

console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, {here: 1, object: 2}));
// → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// → true
console.log(deepEqual(null, {here: 1, object: 2}));
// → false
console.log(deepEqual({a: "Hello", b:"world"}, {a:"Hello", b:"world"}));
// → true
console.log(deepEqual({a: "Yello", b:"world"}, {a:"Hello", b:"world"}));
// → false