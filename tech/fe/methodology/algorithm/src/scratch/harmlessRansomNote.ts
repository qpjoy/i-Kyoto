// # noteText is in magazineText or not
function harmlessRansomNote(noteText: string, magazineText: string) {
  let noteArr = noteText.split(" ");
  let magazineArr = magazineText.split(" ");
  let magazineObj: { [x: string]: any } = {};

  magazineArr.forEach((word: string) => {
    if (!magazineObj[word]) magazineObj[word] = 0;
    magazineObj[word]++;
  });

  let noteIsPossible = true;
  noteArr.forEach((word) => {
    if (magazineObj[word]) {
      magazineObj[word]--;
      if (magazineObj[word] < 0) {
        noteIsPossible = false;
      }
    } else {
      noteIsPossible = false;
    }
  });

  return noteIsPossible;

  // console.log(magazineObj);
}

let sec = harmlessRansomNote(
  "this is a secret note for you from a secret admirer",
  "puerto rico is a place of great wonder and excitement it has many secret waterfall locations that i am an admirer of you must hike quite a distance to find the secret places as they are far from populated areas but is is worth the effor a tip i have for you is to go early in the morning when it is not so hot out also note that you must wear hiking boots this is one of the best places i have ever visited"
);

console.log(`[sec]: `, sec);
