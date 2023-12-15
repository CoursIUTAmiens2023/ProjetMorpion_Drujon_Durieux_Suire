import { create } from "zustand"
import { Pawn } from "../App"

interface useSelectedPionType {
    selectedPion: Pawn | null
    setSelectedPion: (pion: Pawn) => void
    resetSelectedPion: () => void
}

const useSelectedPion = create<useSelectedPionType>((set) => ({
    selectedPion: null,
    setSelectedPion: (pion: Pawn) => set({ selectedPion: pion }),
    resetSelectedPion: () => set({ selectedPion: null }),
}))

export default useSelectedPion
