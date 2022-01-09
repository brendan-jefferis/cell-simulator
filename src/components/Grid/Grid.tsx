import React, { useContext } from 'react'
import Cell from '../Cell/Cell'
import { SimContext } from '../../state/SimProvider'
import { map } from '../../grid'

interface Props {}

const Grid: React.FC<Props> = () => {
  const {
    state: { grid }
  } = useContext(SimContext)
  if (!grid) return null

  return (
    <div
      style={{
        border: '1px solid #999',
        display: 'grid',
        gridTemplateColumns: `repeat(${grid.length}, 1fr)`,
        width: 'min-content'
      }}
    >
      {map(grid, (cell, pos) => (
        <Cell cell={cell} pos={pos} key={`cell-${pos.y}-${pos.x}`} />
      ))}
    </div>
  )
}

export default Grid
