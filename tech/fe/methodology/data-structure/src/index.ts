import { LinkedList } from "./intro/LinkedList";

const list = new LinkedList();
list.addToHead(3);
list.addToHead(2);
list.addToHead(1);
list.addToTail(4);
list.addToTail(2);

const sl = list.search(2);
const sl1 = list.indexOf(2);
list.removeTail();
console.log(`[sl, sl1, list]: `, sl, sl1, list);
