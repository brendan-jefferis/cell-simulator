import React, { useContext } from 'react'
import * as Model from '../../model'
import { SimContext } from '../../state/SimProvider'

interface Props extends Model.CellMetadata {}

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
