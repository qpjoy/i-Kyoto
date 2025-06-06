function countSubstrings(s) {
  let count = 0;
  for (let i = 0; i < s.length; i++) {
    for (let j = s.length; j > i; j--) {
      let subStr = s.substring(i, j);
      console.log(`[subStr]: `, subStr, i, j);
      if (isPalindrome(subStr)) {
        count++;
      }
    }
  }
  return count;
}

function isPalindrome(s) {
  return s === s.split("").reverse().join("");
}

console.log(`[Logger]: `, countSubstrings("abc"));
