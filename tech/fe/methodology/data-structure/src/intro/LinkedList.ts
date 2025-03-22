export class Node {
  value: any;
  next: Node | null;
  prev: Node | null;
  constructor(value: any, next: Node | null, prev: Node | null) {
    this.value = value;
    this.next = next;
    this.prev = prev;
  }
}

export class LinkedList {
  head: Node | null;
  tail: Node | null;

  constructor() {
    this.head = null;
    this.tail = null;
  }

  addToHead(value: any) {
    const newNode = new Node(value, this.head, null);
    if (this.head) this.head.prev = newNode;
    else this.tail = newNode;

    this.head = newNode;
  }

  addToTail(value: any) {
    let newNode = new Node(value, null, this.tail);
    if (this.tail) this.tail.next = newNode;
    else this.head = newNode;
    this.tail = newNode;
  }

  removeHead(): any {
    if (!this.head) return null;
    const val = this.head.value;
    this.head = this.head.next;
    if (this.head) this.head.prev = null;
    else this.tail = null;
    return val;
  }

  removeTail(): any {
    if (!this.tail) return null;
    const val = this.tail.value;
    this.tail = this.tail.prev;
    if (this.tail) this.tail.next = null;
    else this.head = null;
    return val;
  }

  search(searchValue: any): any {
    let currentNode = this.head;
    while (currentNode) {
      if (currentNode.value === searchValue) return currentNode.value;
      currentNode = currentNode.next;
    }
    return null;
  }

  indexOf(searchValue: any): number[] {
    let indexes = [];
    let currentNode = this.head;
    let currentIndex = 0;
    while (currentNode) {
      if (currentNode.value === searchValue) indexes.push(currentIndex);
      currentNode = currentNode.next;
      currentIndex++;
    }
    return indexes;
  }
}
