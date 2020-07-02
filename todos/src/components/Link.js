import React from 'react'

export const Link = ({ active, children, onClick }) => (
  <button onClick={onClick} disabled={active} style={{ marginLeft: '4px' }}>
    {children}
  </button>
)
