import HashMap from "./HashMap.js";

// console.log(list.toString());
const test = new HashMap(); // or HashMap() if using a factory

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
console.log(test.capacity);

test.set("lion", "golden");

console.log(test.length());
console.log(test.capacity);

test.set("banana", "suiii");
test.set("frog", "suiii");
test.set("kite", "suiii");
test.set("moon", "silver");

console.log(test.capacity);

test.set("kite", "sii");
test.set("moon", "ser");
