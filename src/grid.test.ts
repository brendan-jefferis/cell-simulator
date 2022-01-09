import { init, next } from './grid'
import { Cell } from './model'

describe('init', () => {
  const GRID: Cell[][] = [
    [{ alive: false }, { alive: false }, { alive: false }],
    [{ alive: false }, { alive: false }, { alive: false }],
    [{ alive: false }, { alive: false }, { alive: false }]
  ]

  it('should return a reset grid for a given size', () => {
    const result = init(3)
    expect(result).toEqual(GRID)
  })

  it('should be the correct length', () => {
    const result = init(3)
    expect(result.length).toEqual(3)
  })

  it('should be the correct height', () => {
    const result = init(3)
    expect(result[0].length).toEqual(3)
  })
})

describe('next', () => {
  const GRID: Cell[][] = [
    [{ alive: false }, { alive: false }, { alive: true }, { alive: true }],
    [{ alive: false }, { alive: false }, { alive: true }, { alive: true }],
    [{ alive: false }, { alive: true }, { alive: false }, { alive: true }],
    [{ alive: true }, { alive: false }, { alive: true }, { alive: false }]
  ]

  it('should stay dead if less than 3 neighbours', () => {
    const result = next(GRID)
    expect(result[0][0].alive).toBe(false)
  })

  it('should stay alive if 2 neighbours', () => {
    const result = next(GRID)
    expect(result[2][1].alive).toBe(true)
  })

  it('should stay alive if 3 neighbours', () => {
    const result = next(GRID)
    expect(result[0][2].alive).toBe(true)
  })

  it('should die if less than 2 neighbours', () => {
    const result = next(GRID)
    expect(result[3][0].alive).toBe(false)
  })

  it('should die if more than 3 neighbours', () => {
    const result = next(GRID)
    expect(result[2][2].alive).toBe(false)
  })

  it('should revive if exactly 3 neighbours', () => {
    const result = next(GRID)
    expect(result[1][1].alive).toBe(true)
  })

  it('should wrap living cell (x-axis)', () => {
    const result = next(GRID)
    expect(result[1][0].alive).toBe(true)
  })
})
