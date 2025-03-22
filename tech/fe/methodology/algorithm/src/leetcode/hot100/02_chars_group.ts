function groupAnagrams(strs: string[]): string[][] {
  let hashMap: any = new Map();

  for (let i = 0; i < strs.length; i++) {
    let stri = strs[i];
    let key = generateKey(strs[i]);
    if (!hashMap.has(key)) {
      hashMap.set(key, [stri]);
    } else {
      let striArr = hashMap.get(key);
      let newStriArr = [...striArr, stri];
      hashMap.set(key, newStriArr);
    }
  }
  return Array.from(hashMap.values());
}

function generateKey(str: string): string {
  return str.split("").sort().join("");
}

let result: any = groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]);
console.log(`[res]: `, result);
