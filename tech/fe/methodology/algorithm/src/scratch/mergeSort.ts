function mergeSort(arr: number[]): any[] {
  if (arr.length < 2) return arr;
  let middleIndex = Math.floor(arr.length / 2);
  let firstHalf = arr.slice(0, middleIndex);
  let secondHalf = arr.slice(middleIndex);

  return merge(mergeSort(firstHalf), mergeSort(secondHalf));
}

function merge(array1: number[], array2: number[]) {
  let result = [];
  while (array1.length && array2.length) {
    let minElem;
    if (array1[0] < array2[0]) minElem = array1.shift();
    else minElem = array2.shift();
    result.push(minElem);
  }

  if (array1.length) result = result.concat(array1);
  else result = result.concat(array2);
  return result;
}

let ms = mergeSort([6000, 34, 203, 3, 746, 200, 984, 198, 764, 1, 9, 1]);
console.log(`[ms]: `, ms);
