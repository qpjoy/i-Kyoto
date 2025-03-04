interface Color {
  red: string;
  green: number;
  blue: string;
}

type Foo = number | never;
type ElementFunction = (...args: any[]) => Element | Element[];

type FilteredKeys<ToFilter, Condition> = {
  [P in keyof ToFilter]: ToFilter[P] extends Condition ? P : never;
}[keyof ToFilter];

type RelevantColorKeys = FilteredKeys<Color, number>;
type RelevantDocumentKeys = FilteredKeys<Document, ElementFunction>;

type ValueFilteredDoc = Pick<Document, RelevantDocumentKeys>;

function load(doc: ValueFilteredDoc) {
  doc.querySelector("input");
}
