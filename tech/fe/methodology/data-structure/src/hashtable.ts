import { Hash } from "crypto";

function HashTable(size: any) {
  this.buckets = Array(size);
  this.numBuckets = this.buckets.length;
}

function HashNode(key: string, value: any, next: any) {
  this.key = key;
  this.value = value;
  this.next = next || null;
}

HashTable.prototype.hash = function (key: string) {
  let total = 0;
  for (let i = 0; i < key.length; i++) {
    total += key.charCodeAt(i);
  }
  const bucket = total % this.numBuckets;
  return bucket;
};

HashTable.prototype.insert = function (key: string, value: any) {
  const index = this.hash(key);
  console.log(`[INDEX]: `, index);
  if (!this.buckets[index]) {
    this.buckets[index] = new (HashNode as any)(key, value);
  } else if (this.buckets[index].key === key) {
    this.buckets[index].value = value;
  } else {
    let currentNode = this.buckets[index];
    while (currentNode.next) {
      if (currentNode.next.key === key) {
        currentNode.next.value = value;
        return;
      }
      currentNode = currentNode.next;
    }
    currentNode.next = new (HashNode as any)(key, value);
  }
};

HashTable.prototype.get = function (key: string) {
  const index = this.hash(key);
  if (!this.buckets[index]) return null;
  if (this.buckets[index].key === key) return this.buckets[index].value;
  let currentNode = this.buckets[index];
  while (currentNode.next) {
    if (currentNode.next.key === key) return currentNode.next.value;
  }
  return null;
};

HashTable.prototype.retrieveAll = function () {
  let allNodes = [];
  for (let i = 0; i < this.numBuckets; i++) {
    let currentNode = this.buckets[i];
    while (currentNode) {
      allNodes.push(currentNode);
      currentNode = currentNode.next;
    }
  }
  return allNodes;
};

const myHT = new (HashTable as any)(30);
myHT.insert("Dean", "dean@gmail.com");
myHT.insert("Becca", "becca@gmail.com");
myHT.insert("Dane", "dane@gmail.com");
myHT.insert("Dean", "deanmachine@gmail.com");
myHT.insert("Becca", "beccabrown@gmail.com");
myHT.insert("Dane", "dane1010@gmail.com");
myHT.insert("Joe", "Joe@facebook.com");
myHT.insert("Samantha", "sammy@twitter.com");

console.log(`[myHT]: `, myHT.buckets);

console.log(`[myHT.retrieveAll()]: `, myHT.retrieveAll());

console.log(`[myHT.get('Dane')]: `, myHT.get("Dane"));

// console.log(`[my]: `, myHT.hash("Becca"));
