import React from 'react'
import { Machine, assign } from 'xstate'
import { column, row, diagonal, cats } from './logic'

export const MachineContext = React.createContext()

const initialBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]

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
