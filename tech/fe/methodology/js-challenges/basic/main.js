const arrayIntersection = require("./array-intersection");
const countOccurences = require("./count-occurences");
const findMaxNumber = require("./find-max-number");
const reverseString = require("./reverse-string");
const titleCase = require("./title-case");

console.log(countOccurences("hello world", "l"));

console.log(findMaxNumber([1, 2, 66], [4, 10], [99, 100], [10]));

console.log(`[titleCase('hello world')]: `, titleCase("hello world"));

console.log(`[reverse]: `, reverseString("Hello world"));

console.log(
  `[arrayIntersection([10, 20, 30], [30, 40, 50])]: `,
  arrayIntersection([10, 20, 30], [30, 40, 50])
);
