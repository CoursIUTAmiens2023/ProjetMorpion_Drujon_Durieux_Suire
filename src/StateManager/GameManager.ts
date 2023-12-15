import { create } from "zustand"
import { Pion } from "../App"

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
    tab: Pion[]
    setTab: (tab: Pion[]) => void
    resetTab: () => void
}

const generateInitialGrid = () => {
    const initialPions: Pion[] = []
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const position = [i, j]
            if ((i + j) % 2 === 1) {
                const color = i < 4 ? "white" : i > 5 ? "black" : null
                initialPions.push({ isQueen: true, color, position })
            } else {
                initialPions.push({ isQueen: false, color: null, position })
            }
        }
    }
    return initialPions
}

export const useTabPion = create<useTabType>((set) => ({
    tab: generateInitialGrid(),
    setTab: (tab: Pion[]) => set({ tab }),
    resetTab: () => set({ tab: [] }),
}))
