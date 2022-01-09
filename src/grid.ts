import { Cell, Grid, Point } from './model'

enum Edge {
  LEFT,
  TOP,
  RIGHT,
  BOTTOM,
  NONE
}

const isCorner = (grid: Grid, { x, y }: Point): boolean => {
  const bounds = grid.length - 1
  return (
    (x === 0 && y === 0) ||
    (y === 0 && x === bounds) ||
    (x === bounds && y === bounds) ||
    (y === bounds && x === 0)
  )
}

const detectEdge = (grid: Grid, { x, y }: Point): Edge => {
  const bounds = grid.length - 1
  if (isCorner(grid, { x, y })) return Edge.NONE
  if (x === 0) return Edge.LEFT
  if (y === 0) return Edge.TOP
  if (x === bounds) return Edge.RIGHT
  if (y === bounds) return Edge.BOTTOM
  return Edge.NONE
}

const isEdgeCell = (grid: Grid, pos: Point): boolean =>
  detectEdge(grid, pos) !== Edge.NONE

const wrappedCellPos = (grid: Grid, pos: Point): Point | null => {
  const edge = detectEdge(grid, pos)
  if (edge === Edge.NONE) return null
  if (edge === Edge.LEFT) return { x: grid.length, y: pos.y }
  if (edge === Edge.TOP) return { x: pos.x, y: grid.length }
  if (edge === Edge.RIGHT) return { x: -1, y: pos.y }
  if (edge === Edge.BOTTOM) return { x: pos.x, y: -1 }
  return null
}

const isWrappingAliveCell = (grid: Grid, pos: Point, target: Cell): Cell => {
  if (target?.alive || !isEdgeCell(grid, pos)) return target
  const source = wrappedCellPos(grid, pos)
  if (!source) return target
  const x = livingNeighboursCount(grid, source)
  return { ...target, alive: x === 3 }
}

const cellAtPos = (grid: Grid, { x, y }: Point): Cell | undefined =>
  grid[y]?.[x]

const neighboursOfPos = (grid: Grid, { x, y }: Point): Cell[] =>
  [
    { y: y + 1, x: x - 1 },
    { y: y + 1, x: x },
    { y: y + 1, x: x + 1 },
    { y: y, x: x - 1 },
    { y: y, x: x + 1 },
    { y: y - 1, x: x - 1 },
    { y: y - 1, x: x },
    { y: y - 1, x: x + 1 }
  ].map((pos) => cellAtPos(grid, pos))

const livingNeighboursCount = (grid: Grid, pos: Point): number =>
  neighboursOfPos(grid, pos)
    .filter(Boolean)
    .filter(({ alive }) => alive).length

const shouldLive = (livingNeighbours: number, cell: Cell): boolean => {
  if (cell.alive && (livingNeighbours === 2 || livingNeighbours === 3))
    return true
  return !cell.alive && livingNeighbours === 3
}

export const init = (size: number = 3): Cell[][] =>
  [...new Array(size)].map(() =>
    [...new Array(size)].map(() => ({ alive: false }))
  )

export const map = <T>(grid: Grid, mapFn: (cell: Cell, pos: Point) => T) =>
  grid.map((row, y) => row.map((cell, x) => mapFn(cell, { x, y })))

export const update = (grid: Grid, pos: Point, newCell: Cell): Grid =>
  map(grid, (cell, { x, y }) => (x === pos.x && y === pos.y ? newCell : cell))

export const next = (grid: Grid): Grid =>
  map(grid, (cell, pos) => {
    const updatedCell = {
      alive: shouldLive(livingNeighboursCount(grid, pos), cell)
    }
    return isWrappingAliveCell(grid, pos, updatedCell)
  })
