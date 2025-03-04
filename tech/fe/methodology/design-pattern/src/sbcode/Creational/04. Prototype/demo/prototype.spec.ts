import Document from "./document";

const originalDocument = new Document("Original", [
  [1, 2, 3, 4],
  [5, 6, 7, 8]
]);
console.log(originalDocument);

const documentCopy1 = originalDocument.clone(1);
documentCopy1.name = "Copy 1";
documentCopy1.array[1][2] = 200;
console.log(documentCopy1, originalDocument);

const documentCopy2 = originalDocument.clone(1);
documentCopy2.name = "Copy 2";
documentCopy2.array[1] = [9, 10, 11, 12];
console.log(documentCopy2, originalDocument);

const documentCopy3 = originalDocument.clone(2);
documentCopy3.name = "Copy 3";
documentCopy3.array[1][0] = 1234;
console.log(documentCopy3, originalDocument);
