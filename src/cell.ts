import { Cell, Grid, Point } from './model'

const cellAtPoint =
  (grid: Grid) =>
  ({ x, y }: Point): Cell | undefined =>
    grid[y]?.[x]

const neighboursOfPoint = (grid: Grid, { x, y }: Point): Cell[] =>
  [
    { y: y + 1, x: x - 1 },
    { y: y + 1, x: x },
    { y: y + 1, x: x + 1 },
    { y: y, x: x - 1 },
    { y: y, x: x + 1 },
    { y: y - 1, x: x - 1 },
    { y: y - 1, x: x },
    { y: y - 1, x: x + 1 }
  ].map(cellAtPoint(grid))

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
    (x === 0 && y === 0) || (y === 0 && x === bounds) || (x === bounds && y === bounds) || (y === bounds && x === 0)
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

const isEdgeCell = (grid: Grid, point: Point): boolean => detectEdge(grid, point) !== Edge.NONE

export const oppositeEdgeWrapPoint = (grid: Grid, point: Point): Point | null => {
  const edge = detectEdge(grid, point)
  if (edge === Edge.NONE) return null
  if (edge === Edge.LEFT) return { x: grid.length, y: point.y }
  if (edge === Edge.TOP) return { x: point.x, y: grid.length }
  if (edge === Edge.RIGHT) return { x: -1, y: point.y }
  if (edge === Edge.BOTTOM) return { x: point.x, y: -1 }
  return null
}

export const livingNeighboursCount = (grid: Grid, point: Point): number =>
  neighboursOfPoint(grid, point)
    .filter(Boolean)
    .filter(({ alive }) => alive).length

export const shouldLive = (livingNeighbours: number, cell: Cell): boolean => {
  if (cell.alive && (livingNeighbours === 2 || livingNeighbours === 3)) return true
  return !cell.alive && livingNeighbours === 3
}

export const nextState =
  (grid: Grid) =>
  (point: Point): Cell => {
    const cell = cellAtPoint(grid)(point)
    const updatedCell = {
      alive: shouldLive(livingNeighboursCount(grid, point), cell)
    }
    return isWrappingAliveCell(grid, point, updatedCell)
  }

const isWrappingAliveCell = (grid: Grid, point: Point, target: Cell): Cell => {
  if (target?.alive || !isEdgeCell(grid, point)) return target
  const source = oppositeEdgeWrapPoint(grid, point)
  if (!source) return target
  const x = livingNeighboursCount(grid, source)
  return { ...target, alive: x === 3 }
}
