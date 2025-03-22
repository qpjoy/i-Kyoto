// 从最后到开头
// function maxProfit(prices: any): any {
//   // let p0 = prices[0];
//   let n = prices.length;
//   if (n <= 1) return 0;
//   let slow = n - 1;
//   let fast = n - 2;
//   let profit = 0;
//   while (fast >= 0) {
//     if (prices[fast] - prices[slow] >= 0) {
//       console.log(`[fast, slow, prices[fast], prices[slow]]: `, fast, slow, prices[fast], prices[slow]);
//       slow = fast;
//     } else {
//       console.log(`[fast, slow, prices[fast], prices[slow]]: `, fast, slow, prices[fast], prices[slow]);
//       let price = prices[slow] - prices[fast];
//       if (price > profit) profit = price;
//     }
//     fast--;
//   }
//   return profit;
// }

// 贪心算法
export function maxProfit(prices: any) {
  if (prices.length === 0) return 0;
  let min = prices[0];
  let max = 0;
  for (let curr of prices) {
    min = Math.min(min, curr);
    max = Math.max(max, curr - min);
  }

  return max;
}

let maxRes = maxProfit([7, 1, 5, 3, 6, 4]);
console.log(`[maxRes]: `, maxRes);
