// function addBinary(a: string, b: string): string {
//   let aL = a.length;
//   let bL = b.length;
//   let cL = aL > bL ? aL + 1 : bL + 1;
//   let arrc = new Array(cL);
//   let pre = "0";
//   let curr = "0";
//   console.log(`[cL]: `, aL, bL, cL);
//   for (let i = 0; i < cL; i++) {
//     if (a[aL - i - 1] === "1" && b[bL - i - 1] === "1") {
//       curr = pre;
//       pre = "1";
//     } else if (a[aL - i - 1] === "1" || b[bL - i - 1] === "1") {
//       if (pre === "1") {
//         pre = "1";
//         curr = "0";
//       } else {
//         pre = "0";
//         curr = "1";
//       }
//     } else {
//       curr = pre;
//       pre = "0";
//     }
//     console.log(`[pre, curr, arrc, aL, bL, cL]: `, pre, curr, arrc, aL, bL, cL);
//     arrc[cL - i - 1] = curr;
//   }
//   if (arrc[0] === "0") arrc.shift();
//   return arrc.join("");
// }

function addBinary(a: string, b: string): string {
  let ans = "";
  let ca = 0;
  for (let i = a.length - 1, j = b.length - 1; i >= 0 || j >= 0; i--, j--) {
    let sum = ca;
    sum += i >= 0 ? parseInt(a[i]) : 0;
    sum += j >= 0 ? parseInt(b[j]) : 0;
    ans += sum % 2;

    ca = Math.floor(sum / 2);
    console.log(`[sum, i, j, ans]: `, sum, i, j, ans, ca);
  }
  ans += ca == 1 ? ca : "";
  return ans.split("").reverse().join("");
}

// let abRes = addBinary("11", "1");
// let abRes = addBinary("1010", "1011");
// let abRes = addBinary("1111", "1111");
let abRes = addBinary("111", "1010");
console.log(`[abRes]: `, abRes);
