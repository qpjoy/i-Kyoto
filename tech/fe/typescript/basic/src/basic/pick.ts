type Pick1<T, K extends keyof T> = {
  [P in K]: T[P];
};

type PickProperties<ValueType, Keys extends keyof ValueType> = {
  [Key in Keys]: ValueType[Key];
};

type Partials<T> = {
  [P in keyof T]?: T[P];
};

// template literal types
interface DataState {
  digits: number[];
  names: string[];
  flags: Record<"darkMode" | "mobile", boolean>;
}

type DataSDK = {
  [K in keyof DataState as `set${Capitalize<K>}`]: (arg: DataState[K]) => void;
};

function load(dataSDK: DataSDK) {
  dataSDK.setDigits([1, 2, 3]);
  dataSDK.setFlags({ darkMode: true, mobile: false });
}
