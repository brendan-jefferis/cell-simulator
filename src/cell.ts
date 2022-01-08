import { Cell, CellMetadata, Grid, Point } from './model'

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

const isOutOfBounds = (grid: Grid, point: Point): boolean =>
  !cellAtPoint(grid)(point) && neighboursOfPoint(grid, point).every((cell) => !cell)

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
  (point: Point): CellMetadata => {
    const cell = cellAtPoint(grid)(point)
    return {
      cell: {
        alive: shouldLive(livingNeighboursCount(grid, point), cell)
      },
      pos: nextPosition(grid, point)
    }
  }

export const nextPosition = (grid: Grid, point: Point): Point => {
  const gridCell = cellAtPoint(grid)
  const source = gridCell(point)
  if (source || isOutOfBounds(grid, point)) return point
  const isXAxisWrap = gridCell({ ...point, x: point.x + 1 }) || gridCell({ ...point, x: point.x - 1 })
  return isXAxisWrap
    ? {
        x: point.x > 0 ? 0 : grid[0].length - 1,
        y: point.y
      }
    : {
        y: point.y > 0 ? 0 : grid[0].length - 1,
        x: point.x
      }
}
