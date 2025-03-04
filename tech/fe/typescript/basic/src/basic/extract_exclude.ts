type FavoriteColors =
  | "dark sienna"
  | "van dyke brown"
  | "yellow chrenicle"
  | "sap green"
  | "titanium white"
  | "phthalo green"
  | "prussian blue"
  | "cadium yellow"
  | [number, number, number]
  | { red: number; green: number; blue: number }
  | { red: number; g: number; b: number; alpha: number };

type StringColors = Extract<FavoriteColors, string>;
type ObjectColors = Extract<FavoriteColors, { red: number }>;

type TupleColors = Extract<FavoriteColors, [number, number, number]>;
type TupleColorsOne = Extract<FavoriteColors, [number]>;

type NonStringColors = Exclude<FavoriteColors, string>;

// type Exclude<T, U> = T extends U ? never : T;
// type Extract<T, U> = T extends U ? T : never;
