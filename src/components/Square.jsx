export function Square({children, index, updateBoard}) {
   
    const hadleSquareClick = () => {
        updateBoard(index)
    }

    return (
        <div className="tic-tac-square" onClick={hadleSquareClick}>
            <strong>
                {children}
            </strong>
        </div>

    )
}