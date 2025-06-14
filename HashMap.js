import LinkedList from "./LinkedList.js";

export default class HashMap {
  constructor() {
    this.capacity = 16;
    this.LOAD_FACTOR = 0.75;
    this.size = 0;
    this.buckets = Array.from(
      { length: this.capacity },
      () => new LinkedList()
    );
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode % this.capacity;
  }

  isAtMaxLoad() {
    return this.size >= this.capacity * this.LOAD_FACTOR;
  }

  resize() {
    const oldBuckets = this.buckets;
    this.capacity *= 2;
    this.buckets = Array.from(
      { length: this.capacity },
      () => new LinkedList()
    );
    this.size = 0;

    for (const bucket of oldBuckets) {
      for (let i = 0; i < bucket.size(); i++) {
        const node = bucket.at(i);
        this.set(node.key, node.value);
      }
    }
  }

  set(key, value) {
    const hashedKey = this.hash(key);
    const bucket = this.buckets[hashedKey];

    const index = bucket.findKey(key);
    if (index) {
      bucket.removeAt(index);
      bucket.insertAt(key, value, index);
    } else {
      bucket.append({ key, value });
      this.size++;
    }

    if (this.isAtMaxLoad()) {
      this.resize();
    }
  }

  get(key) {
    const hashedKey = this.hash(key);
    const bucket = this.buckets[hashedKey];
    const index = bucket.findKey(key);
    if (index) {
      return bucket.at(index).value;
    }
    return null;
  }

  has(key) {
    const hashedKey = this.hash(key);
    if (this.buckets[hashedKey].containsKey(key)) {
      return true;
    }
    return false;
  }

  remove(key) {
    const hashedKey = this.hash(key);
    const bucket = this.buckets[hashedKey];
    const index = bucket.findKey(key);
    if (index) {
      this.size--;
      bucket.removeAt(index).value;
      return true;
    }
    return false;
  }

  length() {
    return this.size;
  }

  clear() {
    this.buckets = Array.from(
      { length: this.capacity },
      () => new LinkedList()
    );
    this.size = 0;
  }

  keys() {
    const keys = [];
    for (const bucket of this.buckets) {
      for (let i = 0; i < bucket.size(); i++) {
        keys.push(bucket.at(i).key);
      }
    }
    return keys;
  }

  values() {
    const values = [];
    for (const bucket of this.buckets) {
      for (let i = 0; i < bucket.size(); i++) {
        values.push(bucket.at(i).value);
      }
    }
    return values;
  }

  entries() {
    const entries = [];
    for (const bucket of this.buckets) {
      for (let i = 0; i < bucket.size(); i++) {
        const node = bucket.at(i);
        entries.push([node.key, node.value]);
      }
    }
    return entries;
  }
}
