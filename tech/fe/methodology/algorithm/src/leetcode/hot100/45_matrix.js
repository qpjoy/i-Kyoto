function spiralOrder(matrix) {
  let lines = matrix[0].length;
  let rows = matrix.length;
  let border = [];
  let m = 0;
  let n = 0;
  if (rows === 2) {
    border = matrix[0].concat(matrix[1].reverse());
    return border;
  } else if (rows === 1) {
    border = matrix[0];
    return border;
  } else if (lines === 1) {
    border = matrix.reduce((acc, cur) => {
      return acc.concat(cur);
    }, border);
    return border;
  }

  while (m == 0 || m == rows || n == 0 || n == lines) {
    if (m == 0 && n < lines) {
      border = border.concat(matrix[0][n]);
      n++;
    } else if (n == lines && m < rows) {
      if (m != 0) {
        border = border.concat(matrix[m][lines - 1]);
      }
      m++;
      // continue;
    } else if (m == rows && n > 0) {
      n--;
      if (n != lines - 1) {
        border = border.concat(matrix[rows - 1][n]);
      }
    } else if (n == 0 && m > 0) {
      m--;
      if (m == 0) {
        m--;
        n--;
        break;
      }
      console.log(`[matrix]: `, m);
      if (m != rows - 1) {
        border = border.concat(matrix[m][0]);
      }
    }
    console.log(`[n,m]: `, n, m, border);
  }

  // matrix = subMatrix(matrix);
  if (lines >= 3 && rows >= 3) {
    matrix = matrix.slice(1, rows - 1).map((item) => {
      return item.slice(1, lines - 1);
    });
    return border.concat(spiralOrder(matrix));
  }
  return border;
}

// function subMatrix(matrix) {
//   let lines = matrix[0].length;
//   let rows = matrix.length;
//   console.log(`[rows, lines]: `, rows, lines);
//   if (lines >= 3 && rows >= 3) {
//     return matrix.slice(1, rows - 1).map((item) => {
//       return item.slice(1, lines - 1);
//     });
//   } else {
//     return [];
//   }
// }

console.log(
  spiralOrder([[7], [9], [6]])
  // spiralOrder([[1, 3, 2]][[7],[9],[6]]),
  // subMatrix([
  //   [1, 3, 2],
  //   [3, 4, 4],
  //   [5, 5, 6]
  // ])
);
