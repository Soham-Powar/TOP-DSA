import LinkedList from "./LinkedList";

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

  set(key, value) {
    const hashedKey = this.hash(key);

    if (this.buckets[hashedKey].contains(key, value)) {
      const itsIndex = this.buckets[hashedKey].find(key, value);
      this.buckets[hashedKey].removeAt(itsIndex);
      this.buckets[hashedKey].insertAt(key, value, itsIndex);
    } else {
      this.buckets[hashedKey].append(value);
      this.size++;
    }

    if (isAtMaxLoad()) {
      resize();
    }
  }

  get(key) {
    const hashedKey = this.hash(key);
    if (this.buckets[hashedKey].containsKey(key)) {
      const index = this.buckets[hashedKey].findKey(key);
      return this.buckets[hashedKey].at(index).value;
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
    if (this.buckets[hashedKey].containsKey(key)) {
      const index = this.buckets[hashedKey].findKey(key);
      return this.buckets[hashedKey].removeAt(index).value;
    }
    return false;
  }

  length() {
    let len = 0;
    this.buckets.forEach((bucket) => {
      len += bucket.size();
    });
  }

  clear() {
    this.buckets.forEach((bucket) => {
      bucket.head = null;
    });
  }

  keys() {
    let keys = [];
    this.buckets.forEach((bucket) => {
      let i = 0;
      while (i < bucket.size()) {
        keys.push(bucket.at(i).key);
      }
    });
    return keys;
  }

  values() {
    let values = [];
    this.buckets.forEach((bucket) => {
      let i = 0;
      while (i < bucket.size()) {
        values.push(bucket.at(i).value);
      }
    });
    return values;
  }

  entries() {
    let entries = [];
    this.buckets.forEach((bucket) => {
      let i = 0;
      while (i < bucket.size()) {
        entries.push([bucket.at(i).key, bucket.at(i).value]);
      }
    });
    return entries;
  }

  isAtMaxLoad() {
    let maxLoad = this.LOAD_FACTOR * this.capacity;
    if (size >= maxLoad) {
      return true;
    }
    return false;
  }

  resize() {
    const oldBuckets = this.buckets;
    this.buckets = Array.from(
      { length: this.capacity * 2 },
      () => new LinkedList()
    );
    this.capacity *= 2;

    oldBuckets.forEach((bucket) => {
      let i = 0;
      while (i < bucket.size) {
        this.buckets.set(bucket.at(i).key, bucket.at(i).value);
      }
    });
  }
}
