function climbStairs(n: number): number {
  // 爬一楼
  let p = 1;
  // 爬二楼
  let q = 2;
  if (n == 1) {
    return p;
  } else if (n == 2) {
    return q;
  } else {
    // 从第三楼开始，只有两种上楼方式，从前一层再爬一楼和从前二层再爬两楼。
    // 可以推出 f(n) = f(n -1) + f(n -2)
    // 直接递归会超时，所以用的for循环求结果
    let r = 0;
    for (let i = 3; i <= n; i++) {
      r = q + p;
      p = q;
      q = r;
    }
    return r;
  }
}

climbStairs(4);
