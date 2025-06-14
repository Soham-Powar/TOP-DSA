class Node {
  constructor(key = null, value = null, nextNode = null) {
    this.key = key;
    this.value = value;
    this.nextNode = nextNode;
  }
}

export default class LinkedList {
  constructor() {
    this.head = null;
  }

  append(key, value) {
    const newNode = new Node(key, value);
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

  prepend(key, value) {
    const newNode = new Node(key, value, this.head);
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
    while (i < index && temp != null) {
      temp = temp.nextNode;
      i++;
    }
    return temp || null;
  }

  pop() {
    return this.removeAt(this.size() - 1);
  }

  containsKey(key) {
    if (!this.head) {
      return null;
    }
    let temp = this.head;
    while (temp != null) {
      if (temp.key === key) {
        return true;
      }
      temp = temp.nextNode;
    }
    return false;
  }
  contains(key, value) {
    if (!this.head) {
      return null;
    }
    let temp = this.head;
    while (temp != null) {
      if (temp.value === value && temp.key === key) {
        return true;
      }
      temp = temp.nextNode;
    }
    return false;
  }

  find(key, value) {
    if (!this.head) {
      return null;
    }
    let temp = this.head;
    let i = 0;
    while (temp != null) {
      if (temp.value === value && key === temp.key) {
        return i;
      }
      i++;
      temp = temp.nextNode;
    }
    return false;
  }
  findKey(key) {
    if (!this.head) {
      return null;
    }
    let temp = this.head;
    let i = 0;
    while (temp != null) {
      if (key === temp.key) {
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
      toPrint += "( " + temp.key + "," + temp.value + " ) -> ";
      temp = temp.nextNode;
    }
    toPrint += "null";
    return toPrint;
  }

  insertAt(key, value, index) {
    if (index === 0) {
      this.prepend(key, value);
      return;
    }

    let prev = this.at(index - 1);
    if (!prev) return null;

    const newNode = new Node(key, value, prev.nextNode);
    prev.nextNode = newNode;
  }

  removeAt(index) {
    if (!this.head) return null;

    if (index === 0) {
      const removed = this.head;
      this.head = this.head.nextNode;
      return removed;
    }

    let prev = this.at(index - 1);
    if (!prev || !prev.nextNode) return null;

    const removed = prev.nextNode;
    prev.nextNode = prev.nextNode.nextNode;
    return removed;
  }
  clear() {
    this.head = null;
  }
}
