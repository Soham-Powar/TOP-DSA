import Tree from "./BST.js";

// Helper to generate array of random numbers < 100
function generateRandomArray(size = 10, max = 100) {
  const arr = [];
  while (arr.length < size) {
    const rand = Math.floor(Math.random() * max);
    if (!arr.includes(rand)) arr.push(rand);
  }
  return arr;
}

// Create the BST
const randomNumbers = generateRandomArray();
console.log("Random Numbers (<100):", randomNumbers);

const tree = new Tree(randomNumbers);

// Confirm tree is balanced
console.log("Is tree balanced?", tree.isBalanced());

// Print traversals
console.log("Level Order:");
tree.levelOrder((node) => console.log(node.data));

console.log("Pre Order:");
tree.preOrder((node) => console.log(node.data));

console.log("In Order:");
tree.inOrder((node) => console.log(node.data));

console.log("Post Order:");
tree.postOrder((node) => console.log(node.data));

// Unbalance the tree by adding numbers > 100
tree.insert(120);
tree.insert(150);
tree.insert(200);
tree.insert(180);
tree.insert(250);

console.log("Is tree balanced after inserting >100 values?", tree.isBalanced());

// Rebalance the tree
tree.rebalance();

// Confirm it's balanced again
console.log("Is tree balanced after rebalancing?", tree.isBalanced());

// Print all orders again
console.log("Level Order (After Rebalancing):");
tree.levelOrder((node) => console.log(node.data));

console.log("Pre Order (After Rebalancing):");
tree.preOrder((node) => console.log(node.data));

console.log("In Order (After Rebalancing):");
tree.inOrder((node) => console.log(node.data));

console.log("Post Order (After Rebalancing):");
tree.postOrder((node) => console.log(node.data));
