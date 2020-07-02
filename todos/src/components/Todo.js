import React from 'react'

export const Todo = ({ onClick, completed, text }) => (
  <span
    onClick={onClick}
    style={{ textDecoration: completed ? 'line-through' : 'none' }}
  >
    {text}
  </span>
)
