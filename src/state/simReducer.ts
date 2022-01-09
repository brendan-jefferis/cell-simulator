import { Grid } from '../model'
import { init, nextGeneration, updateCell } from '../grid'
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

// FIXME { grid: Grid }
export type SimState = Grid

export const reducer = (state: SimState, action: Action) => {
  switch (action.type) {
    case ActionTypes.RESET:
      return init(config.gridSize)

    case ActionTypes.NEXT:
      return nextGeneration(state)

    case ActionTypes.TOGGLE_CELL:
      const { alive, pos } = action.payload ?? {}
      if (!pos) throw new Error('Missing position')

      return updateCell(state, alive, pos)

    default:
      throw new Error(`Unknown action ${action.type}`)
  }
}
