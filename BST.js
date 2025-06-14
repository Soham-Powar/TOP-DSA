// BALANCED BINARY SEARCH TREES

// BALANCED MEANS DIFFERENCE BETWEEN HEIGHT OF
// LEFT SUBTREE AND RIGHT SUBTREE IS 1/0 FOR ROOT
// AND EVERY CHILD NODE.

class BST_Node {
  constructor(value) {
    this.left = null;
    this.right = null;
    this.data = value;
  }
}

class Tree {
  constructor(array) {
    const removedDups = [...new Set(array)];
    const sortedArray = removedDups.sort((a, b) => a - b);
    this.root = this.buildTree(sortedArray);
  }

  buildBST(array, start, end) {
    if (start > end) return null;

    const mid = Math.floor((start + end) / 2);
    const treeNode = new BST_Node(array[mid]);

    treeNode.left = this.buildBST(array, start, mid - 1);
    treeNode.right = this.buildBST(array, mid + 1, end);

    return treeNode;
  }

  buildTree(array) {
    return this.buildBST(array, 0, array.length - 1);
  }

  prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

  insert(value) {
    let newNode = new BST_Node(value);

    let prev = null;
    let temp = this.root;

    while (temp) {
      if (value < temp.data) {
        prev = temp;
        temp = temp.left;
      } else if (value > temp.data) {
        prev = temp;
        temp = temp.right;
      }
    }
    if (value > prev.data) {
      prev.right = newNode;
    } else if (value < prev.data) {
      prev.left = newNode;
    }
  }
}

const myBST = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
myBST.prettyPrint(myBST.root);
myBST.insert(24);
myBST.insert(21);
myBST.prettyPrint(myBST.root);
