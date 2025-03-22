function maxProfit(prices: number[]): number {
  let n = prices.length;
  if (n <= 1) {
    return 0;
  }
  let slow = 0;
  let fast = 1;
  let profit = 0;
  while (fast < n) {
    if (prices[fast] <= prices[slow]) {
      slow = fast;
    } else {
      profit += prices[fast] - prices[slow];
      slow++;
    }
    fast++;
  }
  return profit;
}
