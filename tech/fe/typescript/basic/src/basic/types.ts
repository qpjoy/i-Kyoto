type DatePropertyNames = keyof Date;
type DateStringPropertyNames = DatePropertyNames & string;
type DateSymbolPropertyNames = DatePropertyNames & symbol;

async function main() {
  const apiResponse = await Promise.all([
    fetch("https://api.github.com/users/octocat"),
    Promise.resolve("Titanium White")
  ]);

  type ApiResponseType = typeof apiResponse;
}

// Mapped Types
type Fruit1 = {
  name: string;
  color: string;
  mass: string;
};
type Dict<T> = { [k: string]: T }; // <- index signature
const fruitCatalog: Dict<Fruit1> = {};
fruitCatalog.apple;

type MyRecord = { [FruitKey in "apple" | "cherry"]: Fruit1 };
function printFruitCatalog(fruitCatalog: MyRecord) {
  fruitCatalog.cherry;
  fruitCatalog.apple;
  // error
  // fruitCatalog.pineapple;
}

type PickWindowProperties<Keys extends keyof Window> = {
  [Key in Keys]: Window[Key];
};
type PartOfWindow = PickWindowProperties<"document" | "alert">;

type PickProperties<Keys extends keyof ValueType, ValueType> = {
  [Key in Keys]: ValueType[Key];
};
type PartOfWindowProperties = PickProperties<"document" | "alert", Window>;
