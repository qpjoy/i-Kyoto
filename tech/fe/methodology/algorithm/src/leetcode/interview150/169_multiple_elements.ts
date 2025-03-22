function majorityElement(nums: number[]): any {
  if (nums.length === 1) {
    return nums[0];
  }
  let hashObj: any = {};
  for (let i = 0; i < nums.length; i++) {
    if (!(nums[i] in hashObj)) {
      hashObj[nums[i]] = 1;
    } else {
      hashObj[nums[i]]++;
      if (nums.length % 2 === 0 && hashObj[nums[i]] >= Math.floor(nums.length / 2)) {
        return nums[i];
      } else {
        if (hashObj[nums[i]] > Math.floor(nums.length / 2)) return nums[i];
      }
    }
  }
}

let majRes = majorityElement([2, 2, 1, 1, 1, 2, 2]);
console.log(`[majRes]: `, majRes);
