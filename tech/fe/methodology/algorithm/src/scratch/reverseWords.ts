function reverseWords(str: string) {
  let wordsArr = str.split(" ");
  let reversedWordsArr: string[] = [];

  wordsArr.forEach((word) => {
    let reversedWord = "";
    for (let i = word.length - 1; i >= 0; i--) {
      reversedWord += word[i];
    }
    reversedWordsArr.push(reversedWord);
  });

  return reversedWordsArr.join(" ");
}

let reversedText = reverseWords("this is a string of world");
console.log(`[reversedText]: `, reversedText);
