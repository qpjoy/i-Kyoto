type Vowels = {
  a: "a";
  e: "e";
  i: "i";
  o: "o";
  u: "u";
};

type VowelInOhansObject = Pick<Vowels, "a" | "o">;

type VowelsNotInOhansObject = Omit<Vowels, "a" | "b">;

type VowelsInOhans = keyof VowelInOhansObject;

type VowelsNotInOhans = keyof VowelsNotInOhansObject;

// const favouriteVowels: VowelsInOhans = "i";

// const favouriteVowelsNO: VowelsNotInOhans = "i";
