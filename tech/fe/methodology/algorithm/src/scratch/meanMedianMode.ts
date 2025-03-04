function getMean(arr: []) {
  let sum = 0;
  arr.forEach((num) => {
    sum += num;
  });
  let mean = sum / arr.length;
  return mean;
}

// 中位数
function getMedian(arr: []) {
  arr.sort((a, b) => a - b);
  let median;
  if (arr.length % 2 !== 0) {
    median = arr[Math.floor(arr.length / 2)];
  } else {
    median = (arr[arr.length / 2] + arr[arr.length / 2 - 1]) / 2;
  }
  return median;
}

function getMode(arr: []) {
  let modeObj: { [key: string]: number } = {};

  arr.forEach((num) => {
    if (!modeObj[num]) modeObj[num] = 0;
    modeObj[num]++;
  });

  let maxFrequency = 0;
  let modes: string[] = [];
  for (let num in modeObj) {
    if (modeObj[num] > maxFrequency) {
      modes = [num];
      maxFrequency = modeObj[num];
    } else if (modeObj[num] === maxFrequency) {
      modes.push(num);
    }
  }

  if (modes.length === Object.keys(modeObj).length) modes = [];
  return modes;
}

function meanMedianMode(arr: any) {
  return {
    mean: getMean(arr),
    median: getMedian(arr),
    mode: getMode(arr)
  };
}

let meanArr: any[] = [1, 1, 2, 2, 4, 4, 6, 6];
let m1 = meanMedianMode(meanArr);
let m2 = meanMedianMode([9, 10, 23, 10, 23, 9]);
console.log(`[m1, m2]: `, m1, m2);
