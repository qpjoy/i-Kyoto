function jump(nums: number[]): number {
  let n = nums.length;
  let pPoint = 0;
  let pEnd = n - 1;
  let count = 0;

  while (pEnd > 0) {
    if (pPoint + nums[pPoint] >= pEnd) {
      pEnd = pPoint;
      pPoint = 0;
      count++;
    } else {
      pPoint++;
    }
  }
  return count;
}

function jump2(nums: number[]): number {
  let maxPos = 0,
    end = 0,
    steps = 0;
  for (let i = 0; i < nums.length - 1; ++i) {
    if (maxPos >= i) {
      maxPos = Math.max(maxPos, i + nums[i]);
      console.log(`[maxPos, i, nums[i], steps]: `, maxPos, i, nums[i], steps);
      if (i === end) {
        end = maxPos;
        ++steps;
      }
    }
  }
  return steps;
}

jump2([2, 3, 1, 1, 4]);
