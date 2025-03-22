function canJump(nums: number[]): boolean {
  let n = nums.length;
  let pn = n - 1;
  let pt = n - 2;
  while (pt >= 0) {
    if (pt + nums[pt] >= pn) {
      pn = pt;
    }
    pt--;
  }
  if (nums[0] >= pn) {
    return true;
  } else {
    return false;
  }
}

canJump([2, 3, 1, 1, 4]);
