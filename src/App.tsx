import { useMemo, useState } from "react"

type Player = "X" | "O" | null

const initialBoard: Player[] = Array(9).fill(null)

function calculateWinner(squares: Player[]): Player | null {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i]
        if (
            squares[a] &&
            squares[a] === squares[b] &&
            squares[a] === squares[c]
        ) {
            return squares[a]
        }
    }
    return null
}

interface SquareProps {
    value: Player
    onClick: () => void
}

function Square({ value, onClick }: SquareProps) {
    const colorValue = useMemo(() => {
        if (value === "X") return "text-red-600"
        if (value === "O") return "text-blue-600"
        return ""
    }, [value])
    return (
        <button
            className={`size-32 border-2 border-[#364439] bg-[#e3ffea]  ${colorValue}`}
            onClick={onClick}
        >
            <span className="text-4xl">{value}</span>
        </button>
    )
}

interface BoardProps {
    squares: Player[]
    onClick: (i: number) => void
}

function Board({ squares, onClick }: BoardProps) {
    const renderSquare = (i: number) => (
        <Square value={squares[i]} onClick={() => onClick(i)} />
    )

    return (
        <div className="border-2 border-[#364439]">
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

function App() {
    const [history, setHistory] = useState<Player[][]>([initialBoard])
    const [turn, setTurn] = useState(0)
    const current = history[turn]
    const winner = calculateWinner(current)

    const handleClick = (i: number) => {
        const newHistory = history.slice(0, turn + 1)
        const squares = [...current]
        if (winner || squares[i]) return
        squares[i] = turn % 2 === 0 ? "X" : "O"
        setHistory([...newHistory, squares])
        setTurn(newHistory.length)
    }

    let status
    if (winner) {
        status = `${winner}`
    } else if (turn === 9) {
        status = `Match nul`
    } else {
        status = `Prochain joueur : ${turn % 2 === 0 ? "X" : "O"}`
    }

    return (
        <div className="flex size-full items-center justify-center bg-[#FFE3F8]">
            <div className="flex h-full flex-col justify-center gap-5">
                <div className="flex flex-1 items-end justify-center">
                    {!winner ? (
                        <div className="flex justify-center gap-4 rounded-full border-2 border-black bg-white p-2">
                            <span className="font-bold">Status</span>
                            <span className="w-40">{status}</span>
                        </div>
                    ) : (
                        <div className="flex justify-center gap-4 rounded-full border-2 border-orange-500 bg-yellow-200 px-4 py-2">
                            <span className="font-bold">Gagnant:</span>
                            <span>{status}</span>
                        </div>
                    )}
                </div>
                <div className="flex w-64 flex-1 justify-center">
                    <Board squares={current} onClick={handleClick} />
                </div>
                <div className="flex flex-1 items-start justify-center">
                    {(winner || turn === 9) && (
                        <button
                            className=" rounded-full border-2 border-blue-500 bg-white px-8 py-2"
                            onClick={() => {
                                setHistory([initialBoard])
                                setTurn(0)
                            }}
                        >
                            Rejouer
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default App
