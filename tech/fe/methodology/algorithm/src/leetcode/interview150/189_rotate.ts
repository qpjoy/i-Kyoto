function rotate(nums: number[], k: number): void {
  let n = nums.length;

  for (let i = n - 1; i >= 0; i--) {
    // if(i+)
    nums[i + k] = nums[i];
  }
  for (let j = k - 1; j >= 0; j--) {
    nums[j] = nums[n + j];
  }
  nums.length = n;
  console.log(`[nums]: `, nums);
}

let rotateRes = rotate([1, 2, 3, 4, 5, 6, 7], 3);
console.log(`[rotateRes]: `, rotateRes);
