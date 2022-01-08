import React, { useContext } from 'react'
import { SimContext } from '../../state/SimProvider'

interface Props {}

const Controls: React.FC<Props> = () => {
  const { actions } = useContext(SimContext)

  return (
    <div>
      <button onClick={() => actions.next()}>Next generation</button>
      <button onClick={() => actions.reset()}>Reset</button>
    </div>
  )
}

export default Controls
