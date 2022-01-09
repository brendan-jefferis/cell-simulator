export interface Point {
  x: number
  y: number
}

export interface Cell {
  alive: boolean
}

export type Grid = Cell[][]
