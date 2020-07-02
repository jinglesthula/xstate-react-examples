import React, { useContext } from 'react'
import { MachineContext } from '../state'
import styled from 'styled-components'

const Button = styled.button`
  background: #ccc;
  height: 4rem;
  width: 4rem;
  font-size: 3rem;
`
export const CellUI = ({ player, onClick }) => (
  <td>
    <Button onClick={onClick} disabled={!!player}>
      {player && (player === 1 ? 'X' : 'O')}
    </Button>
  </td>
)

export const Cell = ({ x, y }) => {
  const [state, send] = useContext(MachineContext)

  return (
    <CellUI
      player={state.context.board[y][x]}
      onClick={() => send({ type: 'TAKE_TURN', x, y })}
    />
  )
}
