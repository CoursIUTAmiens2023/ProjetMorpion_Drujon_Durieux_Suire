import { useState } from "react"
import { Player } from "./Utils/type"
import { useCalculateStatus, useCalculateWinner } from "./Utils"
import { Board } from "./Components/Board"
import Confetti from "react-confetti"
import { useRef } from "react"

const INITIAL_BOARD = Array(9).fill(null)

function App() {
    const [history, setHistory] = useState<Player[][]>([INITIAL_BOARD])
    const [turn, setTurn] = useState(0)
    const current = history[turn]
    const winner = useCalculateWinner(current)
    const status = useCalculateStatus(winner, turn)

    const handleClick = (i: number) => {
        const newHistory = history.slice(0, turn + 1)
        const squares = [...current]
        if (winner || squares[i]) return
        squares[i] = turn % 2 === 0 ? "X" : "O"
        setHistory([...newHistory, squares])
        setTurn(newHistory.length)
    }

    const audioRef = useRef(null)

    return (
        <div className="flex size-full items-center justify-center bg-[#d39efc]">
            <div className="flex h-full flex-col justify-center gap-5">
                <div className="flex flex-1 items-end justify-center">
                    {!winner ? (
                        <div className="flex justify-center gap-4 rounded-full border-2 border-black bg-white px-3 py-2">
                            <span className="font-bold">Status</span>
                            <span className="w-40 text-center">{status}</span>
                        </div>
                    ) : (
                        <div className="flex justify-center gap-4 rounded-full border-2 border-orange-500 bg-yellow-200 px-4 py-2">
                            <span className="font-bold">Gagnant:</span>
                            <span>{status}</span>
                            <Confetti />
                            <audio
                                ref={audioRef}
                                src="/SoundEffect/confettis.mp3"
                                autoPlay
                            />
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
                                setHistory([INITIAL_BOARD])
                                setTurn(0)
                            }}
                        >
                            Rejouer
                        </button>
                    )}
                </div>
                {turn === 9 && !winner && (
                    <audio
                        ref={audioRef}
                        src="/SoundEffect/ring.mp3"
                        autoPlay
                    />
                )}
            </div>
        </div>
    )
}

export default App
