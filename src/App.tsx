import React from 'react'
import Grid from './components/Grid/Grid'
import SimProvider from './state/SimProvider'
import Controls from './components/Controls/Controls'

export default function App() {
  return (
    <SimProvider>
      <Grid />
      <Controls />
    </SimProvider>
  )
}
