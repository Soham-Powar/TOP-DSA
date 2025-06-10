class Node {
  constructor(value = null, nextNode = null) {
    this.value = value;
    this.nextNode = nextNode;
  }
}

export default class LinkedList {
  constructor() {
    this.head = null;
  }

  append(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
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
    if (!this.head) {
      this.head = newNode;
      return;
    }
    newNode.nextNode = this.head;
    this.head = newNode;
  }

  size() {
    let count = 0;
    let temp = this.head;
    while (temp) {
      count++;
      temp = temp.nextNode;
    }
    return count;
  }

  getHead() {
    return this.head;
  }

  tail() {
    if (!this.head) {
      return null;
    }
    let temp = this.head;
    while (temp.nextNode) {
      temp = temp.nextNode;
    }
    return temp;
  }

  at(index) {
    if (!this.head) {
      return null;
    }
    let i = 0;
    let temp = this.head;
    while (i != index && temp != null) {
      temp = temp.nextNode;
      i++;
    }
    return temp;
  }

  pop() {
    if (!this.head) return null;
    if (!this.head.nextNode) {
      this.head = null;
      return;
    }
    let curr = this.head;
    let prev = null;
    while (curr.nextNode) {
      prev = curr;
      curr = curr.nextNode;
    }
    prev.nextNode = null;
  }

  contains(value) {
    if (!this.head) {
      return null;
    }
    let temp = this.head;
    while (temp != null) {
      if (temp.value === value) {
        return true;
      }
      temp = temp.nextNode;
    }
    return false;
  }

  find(value) {
    if (!this.head) {
      return null;
    }
    let temp = this.head;
    let i = 0;
    while (temp != null) {
      if (temp.value === value) {
        return i;
      }
      i++;
      temp = temp.nextNode;
    }
    return false;
  }

  toString() {
    let temp = this.head;
    let toPrint = "";
    while (temp != null) {
      toPrint += "( " + temp.value + " ) -> ";
      temp = temp.nextNode;
    }
    toPrint += "null";
    return toPrint;
  }

  insertAt(value, index) {
    if (!this.head) {
      return null;
    }
    let curr = this.head;
    let prev = null;
    let i = 0;
    while (i != index && curr) {
      i++;
      prev = curr;
      curr = curr.nextNode;
    }
    if (!curr) {
      return null;
    }
    const newNode = new Node(value);
    newNode.nextNode = curr;
    prev.nextNode = newNode;
  }

  removeAt(index) {
    if (!this.head) {
      return null;
    }
    let curr = this.head;
    let prev = null;
    let i = 0;
    while (i != index && curr) {
      i++;
      prev = curr;
      curr = curr.nextNode;
    }
    if (!curr) {
      return null;
    }
    prev.nextNode = curr.nextNode;
  }
}
