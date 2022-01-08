import { livingNeighboursCount, shouldLive, nextCellPosition } from './cell'
import { Cell } from './model'

describe('livingNighboursCount', () => {
  const GRID: Cell[][] = [
    [{ alive: false }, { alive: true }, { alive: false }],
    [{ alive: true }, { alive: true }, { alive: true }],
    [{ alive: false }, { alive: false }, { alive: false }]
  ]

  it('should return neighbours of given cell as list', () => {
    const result = livingNeighboursCount(GRID, { x: 1, y: 1 })
    expect(result).toEqual(3)
  })

  it('should return neighbours of perimeter cell', () => {
    const result = livingNeighboursCount(GRID, { x: -1, y: 0 })
    expect(result).toBe(1)
  })
})

describe('shouldLive', () => {
  it('should stay dead if less than 3   neighbours', () => {
    const CELL = { alive: false }
    const result = shouldLive(2, CELL)
    expect(result).toBe(false)
  })

  it('should stay alive if 2 neighbours', () => {
    const CELL = { alive: true }
    const result = shouldLive(2, CELL)
    expect(result).toBe(true)
  })

  it('should stay alive if 2 neighbours', () => {
    const CELL = { alive: true }
    const result = shouldLive(3, CELL)
    expect(result).toBe(true)
  })

  it('should die if less than 2 neighbours', () => {
    const CELL = { alive: true }
    const result = shouldLive(1, CELL)
    expect(result).toBe(false)
  })

  it('should die if more than 3 neighbours', () => {
    const CELL = { alive: true }
    const result = shouldLive(4, CELL)
    expect(result).toBe(false)
  })

  it('should revive if exactly 3 neighbours', () => {
    const CELL = { alive: false }
    const result = shouldLive(3, CELL)
    expect(result).toBe(true)
  })
})

describe('nextCellPosition', () => {
  const GRID: Cell[][] = [
    [{ alive: false }, { alive: true }, { alive: false }],
    [{ alive: true }, { alive: true }, { alive: true }],
    [{ alive: false }, { alive: false }, { alive: false }]
  ]

  it('should not wrap cell if in-bounds', () => {
    const result = nextCellPosition(GRID, { y: 1, x: 1 })
    expect(result).toEqual({ y: 1, x: 1 })
  })

  it('should not wrap if out-of-bounds', () => {
    const result = nextCellPosition(GRID, { y: 10, x: 10 })
    expect(result).toEqual({ y: 10, x: 10 })
  })

  it('should wrap cell if spawned in grid perimeter (x-axis, r-l)', () => {
    const result = nextCellPosition(GRID, { y: 0, x: 3 })
    expect(result).toEqual({ y: 0, x: 0 })
  })

  it('should wrap cell if spawned in grid perimeter (x-axis, l-r)', () => {
    const result = nextCellPosition(GRID, { y: 0, x: -1 })
    expect(result).toEqual({ y: 0, x: 2 })
  })

  it('should wrap cell if spawned in grid perimeter (y-axis, t-b)', () => {
    const result = nextCellPosition(GRID, { y: -1, x: 0 })
    expect(result).toEqual({ y: 2, x: 0 })
  })

  it('should wrap cell if spawned in grid perimeter (y-axis, b-t)', () => {
    const result = nextCellPosition(GRID, { y: 3, x: 0 })
    expect(result).toEqual({ y: 0, x: 0 })
  })
})
