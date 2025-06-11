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
    // For that hashedKey its the first element.
    if (this.buckets[hashedKey].head == null) {
      this.buckets[hashedKey].append(value);
      this.size++;
      return;
    }
    // 2 cases - hashedKey same and key same

    // Key same
    if (this.buckets[hashedKey].contains(key)) {
      const itsIndex = this.buckets[hashedKey].find(key);
      this.buckets[hashedKey].removeAt(itsIndex);
      this.buckets[hashedKey].insertAt(value, itsIndex);
      return;
    }

    // Key not same - hashedKey value same
    this.buckets[hashedKey].append(value);
    this.size++;

    if (isAtMaxLoad()) {
      resize();
    }
  }

  //   get(key) {
  // 	const hashedKey = this.hash(key);
  // 	if(this.buckets[hashedKey].contains())
  //   }

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
