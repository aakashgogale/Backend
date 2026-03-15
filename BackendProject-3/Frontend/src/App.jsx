import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import FaceExpression from '../src/features/Expression/Components/faceExpression'

function App() {
  const [count, setCount] = useState(0)

  return (
    <FaceExpression />
  )
}

export default App