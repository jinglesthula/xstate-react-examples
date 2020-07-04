import React from 'react'
import { useMachine } from '@xstate/react'
import { MachineContext, TicTacToeMachine } from '../state'
import { cats } from '../state/logic'
import { Board } from './Board'

export const App = () => {
  const [state, send] = useMachine(TicTacToeMachine, { devTools: true })
  const { turn, board } = state.context

  return (
    <MachineContext.Provider value={[state, send]}>
      <h1>Tic Tac Toe</h1>
      <Board board={board} />
      {state.matches('playing') && <p>Player {turn} turn</p>}
      {state.matches('gameOver') && (
        <>
          {cats(board) ? (
            <p>Cat's game...</p>
          ) : (
            <p>Player {state.context.turn === 2 ? 1 : 2} Wins!</p>
          )}
          <button type="button" onClick={() => send('RESET')}>
            RESET
          </button>
        </>
      )}
    </MachineContext.Provider>
  )
}
