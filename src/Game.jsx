import './App.css'
import { useState } from 'react'
import { Square } from './components/Square'
import  { ModalWin } from './components/ModalWin'
import { checkIfWin } from './logic/checkIfWin.js'
import { TURN } from './constants/constant'





export function Game() {
  const [board, SetBoard] = useState(() => {
    const boardFromLocalStorage = localStorage.getItem('board')
    return boardFromLocalStorage ? JSON.parse(boardFromLocalStorage) : Array(9).fill(null)
  })
  
  const [turn, SetTurn] = useState(() => {
    const turnFromLocalStorage = localStorage.getItem('turn')
    return turnFromLocalStorage ? turnFromLocalStorage : TURN.x
  })
  
  /* 
  X o Y -> Ganador  
  False -> Empate 
  Null -> No ha termiado el juego 
  */
  const [winner, setWinner] = useState(null)
  const [wins, setWins] = useState([{ "X": 0, "O": 0 }])


  function updateWinnerCount(winner) {
    const newWins = [...wins]
    newWins[0][winner]++
    setWins(newWins)
  }


  function updateBoard(index) {


    if (board[index] || winner !== null) return

    // Crear un nuevo tablero copiando el existente y seteamos el nuevo movimento
    const newBoard = [...board]
    newBoard[index] = turn
    SetBoard(newBoard)

    // Cambiar el turno para el siguiente movimiento
    const newTurn = turn === TURN.x ? TURN.o : TURN.x
    SetTurn(newTurn)

    // Guardar los datos del turno y los datos del tablero en el local storga 
    window.localStorage.setItem('turn', newTurn)
    window.localStorage.setItem('board', JSON.stringify(newBoard))

    // Verificar si hay un ganador
    const PosibleWinner = checkIfWin(newBoard)
    setWinner(PosibleWinner)

  }

  function resetMatch() {
    SetBoard(Array(9).fill(null))
    SetTurn(TURN.x)
    setWinner(null)
    localStorage.removeItem('board')
  }

  function changePlayerTurn() {
    SetBoard(Array(9).fill(null))
    localStorage.removeItem('board')
    if (turn === TURN.x) {
      SetTurn(TURN.o)
      localStorage.setItem('turn', TURN.o)
    } else {
      SetTurn(TURN.x)
      localStorage.setItem('turn', TURN.x)

    }
  }


  return (
    <div className='tic-tac-container'>
      <h1>Tic-Tac-Toe</h1>

      <div className='tic-tac-board'>
        {
          board.map((square, index)  => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {index == null ? "" : square}
              </Square>
            )
          })
        }
      </div>

      <div className='display-turno-container'>
      
        <span
          className=
          {turn == TURN.x
            ? "display-turno-bg"
            : ""
          }
        >
          X
        </span>
        <span>-</span>
        <span
          className=
          {
            turn == TURN.o
            ? "display-turno-bg"
            : ""
          }
        >
          O
        </span>     
      </div>
      
      {
        winner !== null && (
          <ModalWin
            winner={winner}
            updateWinsCount={updateWinnerCount}
            resetMatch={resetMatch}
            score={wins}
          />
        )
      }

      <div style={{display: "flex", gap: "1rem"}}>
        <button onClick={resetMatch}>
          Reset Game
        </button>

        <button onClick={changePlayerTurn}
          className="btn-change-player"  
        >
          Change Player
        </button>
      </div>

    </div>
  )
}

