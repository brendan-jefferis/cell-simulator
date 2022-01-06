export enum CellState {
  Alive,
  Dead
}

export interface Cell {
  state: CellState
}

export interface Grid {
  cells: Cell[][]
}
