import React from 'react'
import { useMachine } from '@xstate/react'
import { MachineContext, HeroineMachine } from '../state'

export const App = () => {
  const [state, send] = useMachine(HeroineMachine, { devTools: true })

  return (
    <MachineContext.Provider value={[state, send]}>
      <>
        Heroine Game
        <table>
          <thead>
            <tr>
              <th>Action</th>
              <th>Equipment</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{state.value.stance}</td>
              <td>
                {state.value.equipment === 'unarmed' ? 'Unarmed' : 'Armed!'}
                {state.matches('equipment.weapon.firing') ? 'BANG' : ''}
              </td>
            </tr>
          </tbody>
        </table>
        <button onClick={() => send({ type: 'DOWN' })}>Down</button>
        <button onClick={() => send({ type: 'JUMP' })}>Jump</button>
        <button
          onClick={() => send({ type: 'ATTACK' })}
          disabled={state.value.equipment === 'unarmed'}
        >
          Attack
        </button>
        <button
          onClick={() =>
            send({
              type: state.value.equipment === 'unarmed' ? 'EQUIP' : 'UNEQUIP',
            })
          }
        >
          {state.value.equipment === 'unarmed' ? 'EQUIP' : 'UNEQUIP'}
        </button>
        <p>
          <a href="http://gameprogrammingpatterns.com/state.html">
            Credit http://gameprogrammingpatterns.com/state.html
          </a>
        </p>
      </>
    </MachineContext.Provider>
  )
}
