import React from 'react'
import { useMachine } from '@xstate/react'
import { MachineContext, TicTacToeMachine } from '../state'
import { Board } from './Board'

export const App = () => {
  const [state, send] = useMachine(TicTacToeMachine, { devTools: true })
  const { turn, board } = state.context
  const screen = 'PLAYING'

  return (
    <MachineContext.Provider value={[state, send]}>
      <h1>Tic Tac Toe</h1>
      <Board board={board} />
      {screen === 'PLAYING' && <span>Player {turn} turn</span>}
      {screen === 'END' && (
        <button type="button" onClick={() => console.log('reset!')}>
          RESET
        </button>
      )}
    </MachineContext.Provider>
  )
}
