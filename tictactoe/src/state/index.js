import React from 'react'
import { Machine, assign } from 'xstate'

export const MachineContext = React.createContext()

const initialBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]

const column = (board) =>
  [0, 1, 2].some(
    (col) =>
      board[0][col] &&
      board[0][col] === board[1][col] &&
      board[1][col] === board[2][col],
  )

const row = (board) =>
  board.some((row, index) => row[0] && row[0] === row[1] && row[1] === row[2])

const diagonal = (board) =>
  board[1][1] &&
  ((board[0][0] === board[1][1] && board[1][1] === board[2][2]) ||
    (board[0][2] === board[1][1] && board[1][1] === board[2][0]))

const cats = (board) => !board.some((row) => !row[0] || !row[1] || !row[2])

export const TicTacToeMachine = Machine(
  {
    id: 'tictactoe',
    initial: 'playing',
    context: {
      turn: 1,
      board: initialBoard,
    },
    states: {
      playing: {
        on: {
          '': {
            target: 'gameOver',
            cond: 'gameOver',
          },
          TAKE_TURN: {
            target: 'playing',
            actions: assign({
              turn: (context, event) => (context.turn === 1 ? 2 : 1),
              board: (context, event) => {
                const { board, turn } = context
                return [
                  ...board.slice(0, event.y),
                  [
                    ...board[event.y].slice(0, event.x),
                    turn,
                    ...board[event.y].slice(event.x + 1),
                  ],
                  ...board.slice(event.y + 1),
                ]
              },
            }),
          },
        },
      },
      gameOver: {
        on: {
          RESET: {
            target: 'playing',
            actions: assign({
              board: () => initialBoard,
              turn: () => 1,
            }),
          },
        },
      },
    },
  },
  {
    guards: {
      gameOver: (context, event) => {
        const { board } = context
        return (
          row(board, event) ||
          column(board, event) ||
          diagonal(board, event) ||
          cats(board, event)
        )
      },
    },
  },
)
