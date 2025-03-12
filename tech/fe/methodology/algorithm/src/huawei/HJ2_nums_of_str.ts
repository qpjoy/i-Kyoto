function numsOfStr(str: string, chooseStr: number | string) {
  let strNumObj: any = {};
  str = str.toLowerCase();
  for (let i = 0; i < str.length; i++) {
    strNumObj[str[i]] = strNumObj[str[i]] ? strNumObj[str[i]] + 1 : 1;
  }

  return strNumObj[`${chooseStr}`] ?? 0;
}

console.log(`[numsOfStr('H E L L O Nowcoder123')]: `, numsOfStr("H E L L O Nowcoder123", "o"));
