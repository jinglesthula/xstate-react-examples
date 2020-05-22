import React from 'react'
import { useMachine } from '@xstate/react'
import { Machine, assign } from 'xstate'

const counterMachine = Machine({
  id: 'counter',
  initial: 'active',
  context: { count: 0 },
  states: {
    active: {
      on: {
        INCREMENT: {
          actions: assign({ count: (context) => context.count + 1 }),
        },
        DECREMENT: {
          actions: assign({ count: (context) => context.count - 1 }),
        },
      },
    },
  },
})

export const Counter = () => {
  const [state, send] = useMachine(counterMachine)

  return (
    <>
      <h1>Count: {state.context.count}</h1>
      <button onClick={() => send('DECREMENT')}>-</button>
      <button onClick={() => send('INCREMENT')}>+</button>
    </>
  )
}
