function mySqrt(x: number): any {
  if (x === 0) return 0;
  for (let i = 0; i < x; i++) {
    if (i * i >= x) return i - 1;
  }
}
