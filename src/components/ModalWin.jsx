import { Square } from "./Square"
import Confetti from "react-confetti"

// eslint-disable-next-line react/prop-types
export function ModalWin({ winner, resetMatch }) {


    const handleRestMatchClick = () => {
        resetMatch()
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

                </div>



            
            </div>

        </section>
    )
}