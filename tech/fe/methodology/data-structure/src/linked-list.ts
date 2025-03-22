function LinkedList() {
  this.head = null;
  this.tail = null;
}

function Node(value: any, next: Node | null, prev: Node | null) {
  this.value = value;
  this.next = next;
  this.prev = prev;
}

LinkedList.prototype.addToHead = function (value: any) {
  const newNode = new (Node as any)(value, this.head, null);
  if (this.head) this.head.prev = newNode;
  else this.tail = newNode;
  this.head = newNode;
};

LinkedList.prototype.addToTail = function (value: any) {
  const newNode = new (Node as any)(value, null, this.tail);
  if (this.tail) this.tail.next = newNode;
  else this.head = newNode;
  this.tail = newNode;
};

LinkedList.prototype.removeHead = function () {
  if (!this.head) return;
  const val = this.head.value;
  this.head = this.head.next;
  if (this.head) this.head.prev = null;
  else this.tail = null;
  return val;
};

LinkedList.prototype.removeTail = function () {
  if (!this.tail) return null;
  const val = this.tail.value;
  this.tail = this.tail.prev;
  if (this.tail) this.tail.next = null;
  else this.head = null;
  return val;
};

LinkedList.prototype.search = function (searchValue) {
  const currentNode = this.head;
  while (currentNode) {
    if (currentNode.value === searchValue) return currentNode.value;
    currentNode = currentNode.next;
  }
  return null;
};

LinkedList.prototype.indexOf = function (searchValue) {
  let indexes = [];
  let currentNode = this.head;
  let currentIndex = 0;
  while (currentNode) {
    if (currentNode.value === searchValue) indexes.push(currentIndex);
    currentNode = currentNode.next;
    currentIndex++;
  }
  return indexes;
};

const myLL = new (LinkedList as any)();
myLL.addToTail(10);
myLL.addToTail(20);
myLL.addToTail(30);
myLL.addToHead(100);

myLL.removeHead();

console.log(`[myLL]: `, myLL.tail.prev.prev.prev);

// const LL = new (LinkedList as any)();
// // const userList = new (LinkedList as any)();
// // const toDoList = new (LinkedList as any)();
// LL.addToHead(100);
// LL.addToHead(200);
// LL.addToHead(300);
// console.log(`[LL]: `, LL);
