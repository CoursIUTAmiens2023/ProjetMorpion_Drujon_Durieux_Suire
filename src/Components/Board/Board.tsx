import { Player } from "../../Utils"
import { Square } from "../Square"

interface BoardProps {
    squares: Player[]
    // eslint-disable-next-line no-unused-vars
    onClick: (i: number) => void
}

export function Board({ squares, onClick }: BoardProps) {
    const renderSquare = (i: number) => (
        <Square id={i} value={squares[i]} onClick={() => onClick(i)} />
    )

    return (
        <div className="border-2 border-[#53366c]">
            <div className="flex">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="flex">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="flex">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
    )
}
