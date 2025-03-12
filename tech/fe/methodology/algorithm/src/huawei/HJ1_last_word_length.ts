function lengthOfLastWord(str: string): number {
  let strArr = str.split(" ");
  const word = strArr[strArr.length - 1];
  return word.length;
}

console.log(
  `[lengthOfLastWord('i am  \t enjoying my life')]: `,
  lengthOfLastWord("i am  \t enjoying my life")
);
