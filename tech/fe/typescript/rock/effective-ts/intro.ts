interface Vector2D {
  x: number;
  y: number;
}

function calculateLength(v: Vector2D) {
  return Math.sqrt(v.x ** 2 + v.y ** 2);
}

interface NamedVector {
  name: string;
  x: number;
  y: number;
}

interface Vector3D {
  x: number;
  y: number;
  z: number;
}

function normalize(v: Vector3D) {
  const length = calculateLength(v);
  return {
    x: v.x / length,
    y: v.y / length,
    z: v.z / length
  };
}

function calculateLengthL1(v: Vector3D) {
  let length = 0;
  for (const axis of Object.keys(v)) {
    const coord = v[axis];
    //            ~~~~~~~ Element implicitly has an 'any' type because ...
    //                    'string' can't be used to index type 'Vector3D'
    length += Math.abs(coord);
  }
  return length;
}

const vec3D = { x: 3, y: 4, z: 1, address: "123 Broadway" };
calculateLengthL1(vec3D); // OK, returns NaN

function calculateLengthL11(v: Vector3D) {
  return Math.abs(v.x) + Math.abs(v.y) + Math.abs(v.z);
}

interface Author {
  first: string;
  last: string;
}

// function getAuthors(database: PostgresDB): Author[] {
//   const authorRows = database.runQuery(`SELECT first, last FROM authors`);
//   return authorRows.map((row) => ({ first: row[0], last: row[1] }));
// }

interface DB {
  runQuery: (sql: string) => any[];
}
function getAuthors(database: DB): Author[] {
  const authorRows = database.runQuery(`SELECT first, last FROM authors`);
  return authorRows.map((row) => ({ first: row[0], last: row[1] }));
}

// test('getAuthors', () => {
//   const authors = getAuthors({
//     runQuery(sql: string) {
//       return [['Toni', 'Morrison'], ['Maya', 'Angelou']];
//     }
//   });
//   expect(authors).toEqual([
//     {first: 'Toni', last: 'Morrison'},
//     {first: 'Maya', last: 'Angelou'}
//   ]);
// });
