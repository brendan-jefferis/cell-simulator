import { Cell, Grid, Point } from './model'
import { nextState } from './cell'

export const init = (size: number = 3): Cell[][] =>
  [...new Array(size)].map(() => [...new Array(size)].map(() => ({ alive: false })))

export const nextGeneration = (grid: Grid): Grid =>
  grid.map((row, y) => row.map((cell, x) => nextState(grid)({ x, y })))

export const updateCell = (grid: Grid, alive: boolean, pos: Point): Grid =>
  grid.map((row, y) => row.map((cell, x) => (x === pos.x && y === pos.y ? { ...cell, alive } : cell)))
