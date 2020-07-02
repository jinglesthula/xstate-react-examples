import React, { useContext } from 'react'
import { MachineContext } from '../state'
import { Link } from './Link'

export const FilterLink = ({ filter, children }) => {
  const [state, send] = useContext(MachineContext)

  return (
    <Link
      active={state.context.filter === filter}
      onClick={() => send({ type: 'FILTER_TODOS', filter })}
    >
      {children}
    </Link>
  )
}
