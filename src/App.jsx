import { useState } from 'react'
import './App.css'

const TURNS = {
  X: 'ⅹ',
  O: 'o'
}

const Square = ({children, isSelected, updateBoard, index}) => {
  const className = `square ${isSelected ? 'is-selected' : ''}`

  const handleClick = () => {
    updateBoard(index)
  }
  return(
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

const WINNER_COMBOS = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]

function App() {
  const [board, setBoard] =  useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)

  // null no hay ganador, false es un empate
  const [winner, setWinner] = useState(null)

  const checkWinner = (boardToCheck) => {
    // revisamos todas las combinaciones ganadoras para ver si X u 0 ganó
    for (const combo of WINNER_COMBOS) {
      const [a,b,c] = combo // con esto recuperamos las posiciones del juego
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a]
      }
    }
    // si no hay ganador
    return null
  }

  const checkEndGame = (newBoard) => {
    // revisamos si hay un empate
    //si no hay más espacios vacíos en el tablero
    return newBoard.every( (square) => square !== null)
  }

  const updateBoard = (index) => {
    // no actualizamos esta posición si ya tiene algo, o hay un ganador
    if(board[index] || winner) return

    //actualizar el tablero
    const newBoard = [...board]
    newBoard[index] = turn  // el nuevo board recibe el indice y se le pone el valor del turno actual
    setBoard(newBoard)

    // cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    // revisar si hay un ganador
    const newWinner = checkWinner(newBoard)
    if(newWinner){
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)  // empate
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  return(
    <main className='board'>
    <h1>Tic tac toe</h1>
    <section className='game'>
      {
        board.map( (_, index) => {
          return (
            <Square index={index} key={index} updateBoard={updateBoard}>
              {board[index]}
            </Square>
          )
        })
      }
    </section>

    <section className='turn'>
      <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
      <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
    </section>

    {
      winner !== null && (
        <section className='winner'>
          <div className='text'>
            <h2>
              {
                winner === false
                  ? 'Empate'
                  : 'Ganó '
              }
            </h2>

            <header className='win'>
              {winner && <Square>{winner}</Square>}
            </header>

            <footer>
              <button onClick={resetGame}>Empezar de nuevo</button>
            </footer>
          </div> 
        </section>
      )
    }
    <button onClick={resetGame}>Reiniciar juego</button>
  </main>
  )
}

export default App
