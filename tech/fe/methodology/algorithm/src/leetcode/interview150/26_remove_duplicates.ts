export function removeDuplicates(nums: number[]): number {
  let hashObj: any = {};
  let left = 0;
  let p0 = 0;
  let right = nums.length;
  while (left < right) {
    console.log(`[nums, p0]: `, nums, p0, left, hashObj);
    let num = nums[left];
    if (num in hashObj) {
      if (!p0) {
        console.log(`[!p0, left]: `, p0, left, hashObj);
        p0 = left;
        // continue;
      }
    } else {
      hashObj[num] = left;
      nums[p0] = nums[left];
      p0++;
    }
    left++;
  }
  return p0;
}

const dupRes = removeDuplicates([1, 1, 2]);
console.log(`[dupRes]: `, dupRes);
