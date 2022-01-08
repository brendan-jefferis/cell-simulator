import React, { createContext, useReducer } from 'react'
import { init } from '../grid'
import { ActionTypes, reducer, SimState } from './simReducer'
import config from '../config'
import { Point } from '../model'

const initialState: SimState = init(config.gridSize)

interface SimContextType {
  state: SimState
  actions: {
    [key: string]: Function
  }
}

export const SimContext = createContext<SimContextType>({ state: initialState, actions: {} })

const SimProvider: React.FC<{}> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const actions = {
    reset: () => dispatch({ type: ActionTypes.RESET }),
    next: () => dispatch({ type: ActionTypes.NEXT }),
    toggleCell: (alive: boolean, pos: Point) =>
      dispatch({ type: ActionTypes.TOGGLE_CELL, payload: { alive: !alive, pos } })
  }

  return <SimContext.Provider value={{ state, actions }}>{children}</SimContext.Provider>
}

export default SimProvider
