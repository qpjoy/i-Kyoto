function binarySearch(numArray: number[], key: number) {
  let middleIdx = Math.floor(numArray.length / 2);
  let middleElem = numArray[middleIdx];

  if (middleElem === key) {
    return true;
  } else if (middleElem < key && numArray.length > 1) {
    return binarySearch(numArray.slice(middleIdx, numArray.length), key);
  } else if (middleElem > key && numArray.length > 1) {
    return binarySearch(numArray.splice(0, middleIdx), key);
  } else return false;
}

let bsRes = binarySearch([5, 7, 12, 16, 36, 39, 42, 56, 71], 15);
console.log(`[bsRes]: `, bsRes);
