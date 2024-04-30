import { useState, useEffect } from "react"
import { Square } from "./Square"
import Confetti from 'react-confetti'


// Sound dependencies 🎊
import useSound from "use-sound"
import WinSound from "../../public/WinSound.mp3"

export function ModalWin({ winner, resetMatch, updateWinsCount, score }) {

    const [viewScore, setViewScore] = useState("")
    const [play] = useSound(WinSound)

    play()
 


    const handleRestMatchClick = () => {
        updateWinsCount(winner)
        resetMatch()
    }

    const handleViewScoreClick = () => {
        viewScore === "" ? setViewScore("view-score") : setViewScore("")
    }




    return (    
        <section className="winner-container">
            <Confetti/>
            <div className="winner-data">
                <h1>{ winner !== false ? "New Winner" : "Empate"  }</h1>
                <Square
                    updateBoard={() => {}}
                >
                    {winner !== false ? winner : "😀"}
                    
                </Square>
            
                
                <div className="winner-buttons-container">
                    <button  onClick={handleRestMatchClick}>
                        Reset match
                    </button>

                    <button
                        className="winner-view-score-button"
                        onClick={handleViewScoreClick}
                    >
                        View Score
                    </button>
                </div>


                <div className={`winner-score-container ${viewScore}`}>
                    <h1>score</h1>
                    <div className="winner-score-container-data">
                        <h1> {score[0]["X"]} </h1>
                        <span>-</span>
                        <h1> {score[0]["O"]}</h1>
                    </div>
                </div>
            
            </div>

        </section>
    )
}