import React from 'react'
import { FilterLink } from './FilterLink'
import { constants } from '../state'

export const Footer = () => {
  const { SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED } = constants.filters

  return (
    <div>
      <span>Show: </span>
      <FilterLink filter={SHOW_ALL}>All</FilterLink>
      <FilterLink filter={SHOW_ACTIVE}>Active</FilterLink>
      <FilterLink filter={SHOW_COMPLETED}>Completed</FilterLink>
    </div>
  )
}
