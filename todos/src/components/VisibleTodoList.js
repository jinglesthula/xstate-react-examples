import React, { useContext } from 'react'
import { MachineContext, constants } from '../state'
import { Todo } from './Todo'

export const VisibleTodoList = () => {
  const [state, send] = useContext(MachineContext)
  const { todos, filter } = state.context

  const getVisibleTodos = () => {
    switch (filter) {
      case constants.filters.SHOW_ALL:
        return todos
      case constants.filters.SHOW_COMPLETED:
        return todos.filter((todo) => todo.completed)
      case constants.filters.SHOW_ACTIVE:
        return todos.filter((todo) => !todo.completed)
      default:
        return []
    }
  }

  return (
    <ul>
      {getVisibleTodos().map((item) => (
        <li key={item.id}>
          <Todo
            onClick={() => send({ type: 'TOGGLE_TODO', id: item.id })}
            completed={item.completed}
            text={item.text}
          />
        </li>
      ))}
    </ul>
  )
}
