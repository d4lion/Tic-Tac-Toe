import { WINNER_COMBOS, TURN } from '../constants/constant'

export function checkIfWin(board) {

    const allPositionsOcuped = position => {
      if (position === TURN.x || position === TURN.o) {
        return true
      }
      return false
    }
    
    if (board.every(allPositionsOcuped)) return false


    for (const combo of WINNER_COMBOS) {
      const [pos1, pos2, pos3] = combo      
      if (
        board[pos1] &&
        board[pos1] === board[pos2] && 
        board[pos1] === board[pos3]
      ) {
        return board[pos1]
      }
    }
    return null 
  }