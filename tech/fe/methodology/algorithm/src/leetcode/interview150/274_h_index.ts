function hIndex(citations: number[]): any {
  citations.sort((a, b) => a - b);
  console.log(`[citations]: `, citations);
  let h = 0,
    i = citations.length - 1;
  while (i >= 0 && citations[i] > h) {
    console.log(`[i, h, citations[i]]: `, i, h, citations[i]);
    h++;
    i--;
  }
  return h;
}

// let hRes = hIndex([3, 0, 6, 1, 5]);
let hRes = hIndex([1, 3, 1]);
console.log(`[hRes]: `, hRes);
