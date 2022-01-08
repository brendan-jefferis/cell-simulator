import React from 'react'
import * as Model from '../../model'

interface Props extends Model.Cell {}

const Cell: React.FC<Props> = ({ alive }) => (
  <div style={{ height: 50, width: 50, backgroundColor: alive ? 'black' : 'white', border: '1px solid #eee' }} />
)

export default Cell
