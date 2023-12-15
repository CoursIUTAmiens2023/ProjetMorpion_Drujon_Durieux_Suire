import { create } from "zustand"
import { Pawn } from "../App"

interface useTurnType {
    turn: number
    pastTurn: () => void
    resetTurn: () => void
}

export const useTurnPion = create<useTurnType>((set) => ({
    turn: 1,
    pastTurn: () => set((state) => ({ turn: state.turn + 1 })),
    resetTurn: () => set({ turn: 1 }),
}))

interface useScoreType {
    score: [number, number]
    addScoreWhite: () => void
    addScoreBlack: () => void
    resetScore: () => void
}

export const useScorePion = create<useScoreType>((set) => ({
    score: [0, 0],
    addScoreWhite: () =>
        set((state) => ({ score: [state.score[0] + 1, state.score[1]] })),
    addScoreBlack: () =>
        set((state) => ({ score: [state.score[0], state.score[1] + 1] })),
    resetScore: () => set({ score: [0, 0] }),
}))

interface useTabType {
    tab: Pawn[]
    setTab: (tab: Pawn[]) => void
    resetTab: () => void
}

const generateInitialGrid = () => {
    const initialPions: Pawn[] = []
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const position = [i, j]
            if ((i + j) % 2 === 1) {
                const color = i < 1 ? "white" : i > 8 ? "black" : null
                initialPions.push({ isQueen: false, color, position })
            } else {
                initialPions.push({ isQueen: false, color: null, position })
            }
        }
    }
    return initialPions
}

export const useTabPion = create<useTabType>((set) => ({
    tab: generateInitialGrid(),
    setTab: (tab: Pawn[]) => set({ tab }),
    resetTab: () => set({ tab: [] }),
}))
