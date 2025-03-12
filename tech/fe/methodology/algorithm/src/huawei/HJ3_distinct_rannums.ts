let numArr = [];
const numMap = new Map();
function distinctRannums(num: number) {
  if (!numMap.has(num)) numMap.set(num, 1);
  else {
    numMap.set(num, numMap.get(num) + 1);
  }
  // numMap.
}

distinctRannums(1000);
distinctRannums(2000);
distinctRannums(3000);
distinctRannums(4000);
distinctRannums(5000);

console.log(`[num]: `, numMap);
