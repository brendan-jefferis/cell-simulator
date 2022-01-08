import { init } from './grid'
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
