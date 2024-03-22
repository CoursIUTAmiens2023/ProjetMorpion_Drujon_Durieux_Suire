import { Player } from "./type"

export function calculateWinner(squares: Player[]): Player | null {
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

export function calculateStatus(winner: Player | null, turn: number) {
    if (winner) {
        return `${winner}`
    } else if (turn === 9) {
        return `Match nul`
    }

    return `Prochain joueur : ${turn % 2 === 0 ? "X" : "O"}`
}
