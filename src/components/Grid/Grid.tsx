import React, { useContext } from 'react'
import Cell from '../Cell/Cell'
import { SimContext } from '../../state/SimProvider'

interface Props {}

const Grid: React.FC<Props> = () => {
  const { state } = useContext(SimContext)

  if (!state) return null

  return (
    <div
      style={{
        border: '1px solid #999',
        display: 'grid',
        gridTemplateColumns: `repeat(${state.length}, 1fr)`,
        width: 'min-content'
      }}
    >
      {state.map((row, y) => row.map((cell, x) => <Cell cell={cell} pos={{ x, y }} key={`cell-${y}-${x}`} />))}
    </div>
  )
}

export default Grid
