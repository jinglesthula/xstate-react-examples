import React from 'react'
import { Machine, assign } from 'xstate'

export const MachineContext = React.createContext()

export const HeroineMachine = Machine({
  id: 'heroine',
  context: {},
  type: 'parallel',
  states: {
    stance: {
      initial: 'standing',
      states: {
        standing: {
          on: {
            DOWN: 'ducking',
            JUMP: 'jumping',
          },
        },
        jumping: {
          on: {
            DOWN: 'diving',
          },
          after: {
            1500: 'standing',
          },
        },
        ducking: {
          after: {
            800: 'standing',
          },
        },
        diving: {
          after: {
            400: 'standing',
          },
        },
      },
    },
    equipment: {
      initial: 'unarmed',
      states: {
        unarmed: {
          on: {
            EQUIP: 'weapon',
          },
        },
        weapon: {
          initial: 'idle',
          on: {
            UNEQUIP: 'unarmed',
          },
          states: {
            idle: {
              on: { ATTACK: 'firing' },
            },
            firing: {
              after: {
                100: 'idle',
              },
            },
          },
        },
      },
    },
  },
})
