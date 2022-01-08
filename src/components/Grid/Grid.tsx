import React from 'react'
import * as Model from '../../model'
import Cell from '../Cell/Cell'

interface Props {
  grid: Model.Grid
}

const Grid: React.FC<Props> = ({ grid }) => (
  <div
    style={{
      border: '1px solid #999',
      display: 'grid',
      gridTemplateColumns: `repeat(${grid.length}, 1fr)`,
      width: 'min-content'
    }}
  >
    {grid.map((row) => row.map((cell, i) => <Cell {...cell} key={`cell-${i}`} />))}
  </div>
)

export default Grid
