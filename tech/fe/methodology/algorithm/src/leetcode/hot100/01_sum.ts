function twoSum(nums: number[], target: number): any {
  let numDictionary: any = {};
  for (let i = 0; i < nums.length; i++) {
    let res = target - nums[i];

    if (res in numDictionary) {
      return [i, numDictionary[res]];
    }
    if (!(nums[i] in numDictionary)) numDictionary[nums[i]] = i;
  }
}

twoSum([2, 7, 11, 15], 9);
