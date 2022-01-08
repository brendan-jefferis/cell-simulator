import { Cell } from './model'

export const init = (size: number = 3): Cell[][] =>
  [...new Array(size)].map(() => [...new Array(size)].map(() => ({ alive: false })))
