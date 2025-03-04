function maxStockProfit(pricesArr: number[]) {
  let maxProfit = -1;
  let buyPrice = 0;
  let sellPrice = 0;

  let changeBuyPrice = true;

  for (let i = 0; i < pricesArr.length; i++) {
    if (changeBuyPrice) buyPrice = pricesArr[i];
    // buyPrice = pricesArr[i];
    sellPrice = pricesArr[i + 1];

    if (sellPrice < buyPrice) {
      changeBuyPrice = true;
    } else {
      let tempProfit = sellPrice - buyPrice;
      if (tempProfit > maxProfit) {
        maxProfit = tempProfit;
      }
      changeBuyPrice = false;
    }
  }

  return maxProfit;
}

let ms1 = maxStockProfit([32, 46, 26, 38, 40, 48, 42]);
let ms2 = maxStockProfit([10, 18, 4, 5, 9, 6, 16, 12]);
console.log(`[ms1, ms2]: `, ms1, ms2);
