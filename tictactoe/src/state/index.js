import React from 'react'
import { Machine, assign } from 'xstate'

export const MachineContext = React.createContext()

export const TicTacToeMachine = Machine({
  id: 'tictactoe',
  initial: 'playing',
  context: {
    turn: 1,
    board: [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ],
  },
  states: {
    playing: {
      on: {
        TAKE_TURN: {
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
    end: {
      on: {
        RESET: {
          // ?
        },
      },
    },
  },
})
