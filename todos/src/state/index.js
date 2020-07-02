import React from 'react'
import { Machine, assign } from 'xstate'

export const MachineContext = React.createContext()

// TODO: this really doesn't belong here.  It just needs to be imported to here.  Though maybe it's best, since we have to import MachineContext along side it often.  Dunno.  Maybe this is where just using plain strings is better.  Or maybe this is better because you get typo and collision prevention
export const constants = {
  filters: {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE',
  },
}

export const TodosMachine = Machine({
  id: 'todos',
  initial: 'active',
  context: {
    todos: [],
    filter: constants.filters.SHOW_ALL,
    nextActionId: 0,
  },
  states: {
    active: {
      on: {
        ADD_TODO: {
          // TODO: move the implementation of these actions into the options object (2nd argument passed to Machine())
          actions: assign({
            todos: (context, event) => [
              ...context.todos,
              { id: context.nextActionId, text: event.todo, completed: false },
            ],
            nextActionId: (context) => context.nextActionId + 1,
          }),
        },
        TOGGLE_TODO: {
          actions: assign({
            todos: (context, event) =>
              context.todos.map((todo) =>
                todo.id === event.id
                  ? { ...todo, completed: !todo.completed }
                  : todo,
              ),
          }),
        },
        FILTER_TODOS: {
          actions: assign({
            filter: (context, event) => event.filter,
          }),
        },
      },
    },
  },
})
