import { useMachine } from '@xstate/react'
import { MachineContext, TodosMachine } from '../state'
import { AddTodo } from './AddTodo'
import { VisibleTodoList } from './VisibleTodoList'
import { Footer } from './Footer'
import React from 'react'

export const App = () => {
  const [state, send] = useMachine(TodosMachine, { devTools: true })

  return (
    <MachineContext.Provider value={[state, send]}>
      <AddTodo onSubmit={(todo) => send({ type: 'ADD_TODO', todo })}></AddTodo>
      <VisibleTodoList />
      <Footer />
    </MachineContext.Provider>
  )
}
