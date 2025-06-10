class Node {
  constructor(value = null, nextNode = null) {
    this.value = value;
    this.nextNode = nextNode;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  append(value) {
    const newNode = new Node(value);
    if (!head) {
      head = newNode;
      return;
    }
    let temp = this.head;
    while (temp.nextNode) {
      temp = temp.nextNode;
    }
    temp.nextNode = newNode;
  }

  prepend(value) {
    const newNode = new Node(value);
    if (!head) {
      head = newNode;
      return;
    }
    newNode.nextNode = this.head;
    this.head = newNode;
  }

  size() {
    if (!head) {
      return 0;
    }
    let temp = this.head;
    let i = 0;
    while (temp.nextNode) {
      i++;
    }
    i++;
    return i;
  }

  head() {
    return this.head;
  }

  tail() {
    if (!head) {
      return null;
    }
    let temp = this.head;
    while (temp.nextNode) {
      temp = temp.nextNode;
    }
    return temp;
  }
}
