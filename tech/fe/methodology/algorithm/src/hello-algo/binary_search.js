function binarySearchLCRO(nums, target) {
  let i = 0,
    j = nums.length;

  while (i < j) {
    const m = parseInt(i + (j - i) / 2);
    if (nums[m] < target) {
      i = m + 1;
    } else if (nums[m] > target) {
      j = m;
    } else {
      return m;
    }
  }
  return -1;
}
