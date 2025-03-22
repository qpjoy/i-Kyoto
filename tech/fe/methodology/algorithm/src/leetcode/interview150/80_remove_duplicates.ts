// function removeDuplicates(nums: number[]): number {
//   let n = nums.length;
//   let count = 0;
//   let p0 = 0;
//   if (n <= 2) {
//     return n;
//   }
//   let fast = 2;
//   let slow = 2;
//   while (fast < n) {
//     if (nums[fast - 1] === nums[fast - 2] && nums[fast] === nums[fast - 1]) {
//       slow = fast;
//       if (!p0) {
//         p0 = fast;
//       }
//     }
//     if (nums[fast] !== nums[slow]) {
//       nums[p0] = nums[fast];
//       slow++;
//       count++;
//       p0++;
//     } else {
//       nums[slow];
//     }
//     fast++;
//   }
//   console.log(`[nums]: `, nums);
//   return n - count;
// }

export function removeDuplicates(nums: number[]): number {
  if (nums.length <= 2) return nums.length;

  let slow = 2; // 允许最多出现两次

  for (let fast = 2; fast < nums.length; fast++) {
    if (nums[fast] !== nums[slow - 2]) {
      nums[slow] = nums[fast];
      slow++;
    }
  }
  console.log(`[nums]: `, nums);

  return slow;
}

let rmDup = removeDuplicates([1, 1, 1, 2, 2, 3]);
// let rmDup = removeDuplicates([0, 0, 1, 1, 1, 1, 2, 3, 3]);

console.log(`[rmDup]: `, rmDup);
