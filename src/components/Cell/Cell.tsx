import React, { useContext } from 'react'
import { SimContext } from '../../state/SimProvider'
import { Cell, Point } from '../../model'

interface Props {
  cell: Cell
  pos: Point
}

const Cell: React.FC<Props> = ({ cell, pos }) => {
  const { actions } = useContext(SimContext)
  const { alive } = cell

  return (
    <div
      style={{ height: 50, width: 50, backgroundColor: alive ? 'black' : 'white', border: '1px solid #eee' }}
      onClick={() => actions.toggleCell(alive, pos)}
    />
  )
}

export default Cell
