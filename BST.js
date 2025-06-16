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

export default class Tree {
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

    if (this.root === null) {
      this.root = newNode;
      return;
    }

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

  getInOrderSuccessor(curr) {
    curr = curr.right;
    while (curr != null && curr.left != null) {
      curr = curr.left;
    }
    return curr;
  }

  delete(value, root = this.root) {
    if (root === null) {
      return root;
    }

    if (value < root.data) {
      root.left = this.delete(value, root.left);
    } else if (value > root.data) {
      root.right = this.delete(value, root.right);
    } else {
      // Node to be removed found. (3 cases)

      // No child or one child
      if (root.left === null) {
        return root.right;
      }
      if (root.right === null) {
        return root.left;
      }
      // 2 children
      let succ = this.getInOrderSuccessor(root);
      root.data = succ.data;
      root.right = this.delete(succ.data, root.right);
    }
    return root;
  }

  find(value) {
    let temp = this.root;
    while (temp !== null) {
      if (value < temp.data) {
        temp = temp.left;
      } else if (value > temp.data) {
        temp = temp.right;
      } else {
        return temp;
      }
    }
    return null;
  }

  levelOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error("Callback function is required");
    }

    const queue = [];
    if (this.root) queue.push(this.root);

    while (queue.length !== 0) {
      const current = queue.shift();
      callback(current);

      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }
  }

  inOrder(callback, curr = this.root) {
    if (typeof callback !== "function") {
      throw new Error("Callback function is must be passed.");
    }

    if (!curr) {
      return;
    }

    this.inOrder(callback, curr.left);
    callback(curr);
    this.inOrder(callback, curr.right);
  }

  preOrder(callback, curr = this.root) {
    if (typeof callback !== "function") {
      throw new Error("Callback function is must be passed.");
    }

    if (!curr) return;

    callback(curr);
    this.preOrder(callback, curr.left);
    this.preOrder(callback, curr.right);
  }

  postOrder(callback, curr = this.root) {
    if (typeof callback !== "function") {
      throw new Error("Callback function is required");
    }

    if (!curr) return;

    this.postOrder(callback, curr.left);
    this.postOrder(callback, curr.right);
    callback(curr);
  }

  height(value) {
    const node = this.find(value);
    if (!node) return null;

    function getHeight(curr) {
      if (!curr) return -1;
      return 1 + Math.max(getHeight(curr.left), getHeight(curr.right));
    }

    return getHeight(node);
  }

  depth(value) {
    let temp = this.root;
    let depth = 0;
    while (temp !== null) {
      if (value < temp.data) {
        depth++;
        temp = temp.left;
      } else if (value > temp.data) {
        depth++;
        temp = temp.right;
      } else {
        return depth;
      }
    }
    return null;
  }

  isBalanced(node = this.root) {
    function getHeight(curr) {
      if (!curr) return -1;
      return 1 + Math.max(getHeight(curr.left), getHeight(curr.right));
    }

    if (!node) return true;

    const leftHeight = getHeight(node.left);
    const rightHeight = getHeight(node.right);

    if (Math.abs(leftHeight - rightHeight) > 1) return false;

    return this.isBalanced(node.left) && this.isBalanced(node.right);
  }

  rebalance() {
    let arr = [];
    this.inOrder((arg) => {
      arr.push(arg.data);
    });
    this.root = this.buildTree(arr);
  }
}

const myBST = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
// myBST.prettyPrint(myBST.root);
// myBST.insert(24);
myBST.insert(22);
myBST.insert(21);
myBST.insert(28);
myBST.insert(27);
myBST.insert(24);
myBST.insert(32);
myBST.prettyPrint(myBST.root);
myBST.delete(23);
myBST.delete(21);
myBST.delete(28);
myBST.delete(32);
myBST.prettyPrint(myBST.root);
myBST.inOrder((node) => {
  console.log(node.data);
});
