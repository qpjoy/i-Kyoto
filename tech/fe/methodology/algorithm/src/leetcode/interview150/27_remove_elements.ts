function removeElement(nums: number[], val: number): number {
  let p1 = 0;
  let p2 = nums.length - 1;
  let count = 0;
  while (p1 <= p2) {
    if (nums[p1] !== val) {
      p1++;
    } else {
      while (p2 > p1) {
        if (nums[p2] !== val) {
          let temp = 0;
          temp = nums[p1];
          nums[p1] = nums[p2];
          nums[p2] = temp;
          p1++;
          p2--;
          count++;
          break;
        } else {
          p2--;
          count++;
        }
      }
      if (p2 === p1 && nums[p1] === val) {
        nums[p1] = null!;
        count++;
      }
    }
  }
  return nums.length - count;
}

// function removeElement(nums: number[], val: number): number {
//   let left = 0, right = nums.length;
//      while (left < right) {
//          if (nums[left] === val) {
//              nums[left] = nums[right - 1];
//              right--;
//          } else {
//              left++;
//          }
//      }
//      return left;
//  }

let rmRes: any = removeElement([1, 2, 3, 4], 1);
// let rmRes: any = removeElement([3, 3], 3);
// let rmRes: any = removeElement([3, 2, 2, 3], 3);
// let rmRes: any = removeElement([0, 1, 2, 2, 3, 0, 4, 2], 2);
console.log(`[rmRes]: `, rmRes);
