import { livingNeighboursCount, nextState, shouldLive } from './cell'
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
  it('should stay dead if less than 3 neighbours', () => {
    const CELL = { alive: false }
    const result = shouldLive(2, CELL)
    expect(result).toBe(false)
  })

  it('should stay alive if 2 neighbours', () => {
    const CELL = { alive: true }
    const result = shouldLive(2, CELL)
    expect(result).toBe(true)
  })

  it('should stay alive if 3 neighbours', () => {
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

describe('nextState', () => {
  const GRID: Cell[][] = [
    [{ alive: false }, { alive: false }, { alive: true }, { alive: true }],
    [{ alive: false }, { alive: false }, { alive: true }, { alive: true }],
    [{ alive: false }, { alive: true }, { alive: false }, { alive: true }],
    [{ alive: true }, { alive: false }, { alive: true }, { alive: false }]
  ]

  it('should stay dead if less than 3 neighbours', () => {
    const pos = { x: 0, y: 0 }
    const result = nextState(GRID)(pos)
    expect(result.alive).toBe(false)
  })

  it('should stay alive if 2 neighbours', () => {
    const pos = { x: 1, y: 2 }
    const result = nextState(GRID)(pos)
    expect(result.alive).toBe(true)
  })

  it('should stay alive if 3 neighbours', () => {
    const pos = { x: 2, y: 0 }
    const result = nextState(GRID)(pos)
    expect(result.alive).toBe(true)
  })

  it('should die if less than 2 neighbours', () => {
    const pos = { x: 0, y: 3 }
    const result = nextState(GRID)(pos)
    expect(result.alive).toBe(false)
  })

  it('should die if more than 3 neighbours', () => {
    const pos = { x: 2, y: 2 }
    const result = nextState(GRID)(pos)
    expect(result.alive).toBe(false)
  })

  it('should revive if exactly 3 neighbours', () => {
    const pos = { x: 1, y: 1 }
    const result = nextState(GRID)(pos)
    expect(result.alive).toBe(true)
  })

  it('should wrap living cell (x-axis)', () => {
    const pos = { x: 0, y: 1 }
    const result = nextState(GRID)(pos)
    expect(result.alive).toBe(true)
  })
})
