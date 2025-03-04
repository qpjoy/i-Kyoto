function isPalindrome(str: string) {
  str = str.toLowerCase();
  let charactersArr = str.split("");
  let validCharacters = "abcdefghijklmnopqrstuvwxyz".split("");

  let lettersArr: string[] = [];
  charactersArr.forEach((char) => {
    if (validCharacters.indexOf(char) > -1) lettersArr.push(char);
  });

  if (lettersArr.join("") === lettersArr.reverse().join("")) return true;
  else return false;
}

let res = isPalindrome("Madam I'm Adam");
let res1 = isPalindrome("Coding Javascript");
console.log(`[res]: `, res, res1);
