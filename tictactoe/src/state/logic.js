export const column = (board) =>
  [0, 1, 2].some(
    (col) =>
      board[0][col] &&
      board[0][col] === board[1][col] &&
      board[1][col] === board[2][col],
  )

export const row = (board) =>
  board.some((row, index) => row[0] && row[0] === row[1] && row[1] === row[2])

export const diagonal = (board) =>
  board[1][1] &&
  ((board[0][0] === board[1][1] && board[1][1] === board[2][2]) ||
    (board[0][2] === board[1][1] && board[1][1] === board[2][0]))

export const cats = (board) =>
  !board.some((row) => !row[0] || !row[1] || !row[2]) &&
  !(row(board) || column(board) || diagonal(board))
