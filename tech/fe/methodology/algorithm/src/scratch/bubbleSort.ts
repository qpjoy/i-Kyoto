// bubbleSort
export function bubbleSort(arr: number[]) {
  // return array, sorted with bubble sort
  for (let i = arr.length; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }

  return arr;
}

let bsRes: any = bubbleSort([5, 3, 8, 2, 1, 4]);
console.log(`[bsRes]: `, bsRes);
