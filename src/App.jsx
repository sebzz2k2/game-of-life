import './App.css'
import { useState, useEffect } from 'react'
function App() {
  const [grid, setGrid] = useState(Array.from({ length: 100 }, () => Array.from({ length: 40 }, () => Math.random() > 0.7 ? 1 : 0)))
  useEffect(() => {
    const timer = setTimeout(() => {
      createNewGeneration()
    }, 100)
    return () => clearTimeout(timer)
  }, [grid])

  const createNewGeneration = () => {
    console.log('new generation')
    const newGrid = grid.map((row) => row.slice())

    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        const aliveNeighbours = getAliveNeighbours(grid, i, j)
        console.log(aliveNeighbours)
        if (grid[i][j] === 1 && aliveNeighbours < 2) {
          newGrid[i][j] = 0
        }
        if (grid[i][j] === 1 && (aliveNeighbours === 2 || aliveNeighbours === 3)) {
          newGrid[i][j] = 1
        }
        if (grid[i][j] === 1 && aliveNeighbours > 3) {
          newGrid[i][j] = 0
        }
        if (grid[i][j] === 0 && aliveNeighbours === 3) {
          newGrid[i][j] = 1
        }
      }
    }
    setGrid(newGrid)
  }

  const getAliveNeighbours = (grid, i, j) => {
    let aliveNeighbours = 0
    if (i > 0) {
      if (grid[i - 1][j] === 1) aliveNeighbours++
      if (j > 0 && grid[i - 1][j - 1] === 1) aliveNeighbours++
      if (j < grid[i].length - 1 && grid[i - 1][j + 1] === 1) aliveNeighbours++
    }
    if (i < grid.length - 1) {
      if (grid[i + 1][j] === 1) aliveNeighbours++
      if (j > 0 && grid[i + 1][j - 1] === 1) aliveNeighbours++
      if (j < grid[i].length - 1 && grid[i + 1][j + 1] === 1) aliveNeighbours++
    }
    if (j > 0 && grid[i][j - 1] === 1) aliveNeighbours++
    if (j < grid[i].length - 1 && grid[i][j + 1] === 1) aliveNeighbours++
    return aliveNeighbours
  }
  return (
    <div className='grid'>
      {grid.map((row, i) => (
        <div key={Math.random() + i} className="row">
          {row.map((col, j) => (
            <div
              className="col" key={Math.random() + i + j}
              style={{
                background: grid[i][j] === 1 ? '#111' : 'white'
              }}

            >{ }</div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default App
