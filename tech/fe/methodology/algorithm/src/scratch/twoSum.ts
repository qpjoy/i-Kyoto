function twoSum(numArray: number[], sum: number) {
  let pairs = [];
  let hashtable = [];

  for (let i = 0; i < numArray.length; i++) {
    let currNum = numArray[i];
    let counterpart = sum - currNum;
    if (hashtable.indexOf(counterpart) !== -1) {
      pairs.push([currNum, counterpart]);
    }

    hashtable.push(currNum);
  }

  return pairs;
}

let sumNum = twoSum([1, 6, 4, 5, 3, 3], 7);
console.log(`[sumNum]: `, sumNum);
