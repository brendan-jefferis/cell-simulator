import { Grid } from '../model'
import { init, next, update } from '../grid'
import config from '../config'

export enum ActionTypes {
  RESET,
  NEXT,
  TOGGLE_CELL
}

interface Action {
  type: ActionTypes
  payload?: any
}

export type SimState = {
  grid: Grid
}

export const reducer = (state: SimState, action: Action): SimState => {
  const { grid } = state
  switch (action.type) {
    case ActionTypes.RESET:
      return { ...state, grid: init(config.gridSize) }

    case ActionTypes.NEXT:
      return { ...state, grid: next(grid) }

    case ActionTypes.TOGGLE_CELL:
      const { alive, pos } = action.payload ?? {}
      if (!pos) throw new Error('Missing position')

      return { ...state, grid: update(grid, pos, { alive }) }

    default:
      throw new Error(`Unknown action ${action.type}`)
  }
}
