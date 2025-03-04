function fibonacci(position: number): number {
  if (position < 3) {
    return 1;
  } else return fibonacci(position - 1) + fibonacci(position - 2);
}

let f1 = fibonacci(3);
let f2 = fibonacci(9);
console.log(`[f1, f2]: `, f1, f2);

function fibMemo(index: number, cache: number[]) {
  cache = cache || [];
  if (cache[index]) return cache[index];
  else {
    if (index < 3) {
      return 1;
    } else {
      cache[index] = fibMemo(index - 1, cache) + fibMemo(index - 2, cache);
    }
  }
  return cache[index];
}

let fm = fibMemo(20, []);
console.log(`[fm]: `, fm);
