function insertionSort(nums) {
  for (let i = 1; i < nums.length; i++) {
    let base = nums[i],
      j = i - 1;
    while (j >= 0 && nums[j] > base) {
      nums[j + 1] = nums[j];
      j--;
    }
    nums[j + 1] = base;
  }
}
