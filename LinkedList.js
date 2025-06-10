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

  at(index) {
    if (!head) {
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
    if (!head) {
      return null;
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
    if (!head) {
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
    if (!head) {
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
    }
    toPrint += "null";
    return toPrint;
  }
}
