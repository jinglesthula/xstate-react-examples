import React, { useContext } from 'react'
import { MachineContext } from '../state'
import { Cell } from './Cell'

export const BoardUI = ({ board = [] }) => (
  <table>
    <tbody>
      {board.map((row, y) => (
        <tr key={y}>
          {row.map((cell, x) => (
            <Cell key={`${x}${y}`} x={x} y={y} player={board[y][x]} />
          ))}
        </tr>
      ))}
    </tbody>
  </table>
)

export const Board = () => {
  const [state] = useContext(MachineContext)

  return <BoardUI board={state.context.board} />
}
