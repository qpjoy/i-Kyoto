function reverseArrayInPlace(arr: (string | number)[]) {
  // reverse arr
  // return reversed arr
  for (let i = 0; i < arr.length / 2; i++) {
    let tempVar = arr[i];
    arr[i] = arr[arr.length - 1 - i];
    arr[arr.length - 1 - i] = tempVar;
  }

  return arr;
}

let reversedArr = reverseArrayInPlace([1, 2, 3, 4, 5]);
console.log(`[reversedArr]: `, reversedArr);
