import React from 'react'
import { init } from './grid'
import Grid from './components/Grid/Grid'

export default function App() {
  const grid = init(6)
  return <Grid grid={grid} />
}
