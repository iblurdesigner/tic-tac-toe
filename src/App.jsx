import { useState } from 'react'
import confetti from "canvas-confetti"
import { Square } from './components/Square'
import { TURNS } from './constants'
import { checkEndGame, checkWinnerFrom } from './logic/board'
import { WinnerModal } from './components/WinnerModal'

function App() {
  const [board, setBoard] =  useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)

  // null no hay ganador, false es un empate
  const [winner, setWinner] = useState(null)

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
    const newWinner = checkWinnerFrom(newBoard)
    if(newWinner){
      confetti()
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

    <WinnerModal winner={winner} resetGame={resetGame} />

    <button onClick={resetGame}>Reiniciar juego</button>
  </main>
  )
}

export default App
