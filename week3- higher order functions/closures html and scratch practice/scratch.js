/***********************************************************************
** Author:      Adam Wright
** Description: Exploration of solving multiple closure bug with pre-es6
**              function scope. Block scope using let would solve this
**              problem more easily today. Expiraments are commented out.
***********************************************************************/

// // Function that sums an array
// let arr = [1,2,3,4,5];

// arrSum = function(arr){
//     return arr.reduce(function(a,b){
//       return a + b
//     }, 0);
//   }

// console.log('\n', arrSum(arr));


// // Sum an array with for each
// let arr = [1,2,3,4,5];
// let sum = 0;

// arr.forEach(function(e) {
//     sum += e;
//     return sum;
// });

// console.log(sum);


// // Function that creates character speaking functions
// function dialog(name) {
//     return function(str) {
//         return name + " says " + str;
//     }
// }

// var Donald = {name: "Donald Duck"};
// Donald.speak = dialog("Donald Duck");
// console.log(Donald.speak("Hello there"));


// // Broken single closure version
// function buildList(list) {
//     var result = [];
//     for (var i = 0; i < list.length; i++) {
//         var item = 'item' + list[i];
//         result.push( function() {alert(item + ' ' + list[i])} );
//     }
//     return result;
// }
 
// function testList() {
//     var fnlist = buildList([1,2,3]);
//     // using j only to help prevent confusion - could use i
//     for (var j = 0; j < fnlist.length; j++) {
//         fnlist[j]();
//     }
// }

// testList();


// Working multiple closure version
function buildList(list) {
    var result = [];
    for (var i = 0; i < list.length; i++) {
        var item = 'item';
        result.push(function(x) {
            return function() {alert(item + ' ' + list[x])} 
        }(i)); 
    }
    return result;
}
 
function testList() {
    var fnlist = buildList([1,2,3]);
    // Using j only to help prevent confusion - could use i
    for (var j = 0; j < fnlist.length; j++) {
        fnlist[j]();
    }
}

testList();


// function buildList(list) {
//     var result = [];
//     for (var i = 0; i < list.length; i++) {
//         var item = 'item' + list[i];
//         result.push( function() {alert(item + ' ' + list[i])} );
//     }
//     return result;
// }
 
// function testList() {
//     var fnlist = buildList([1,2,3]);
//     // using j only to help prevent confusion - could use i
//     for (var j = 0; j < fnlist.length; j++) {
//         fnlist[j]();
//     }
// }

// testList();