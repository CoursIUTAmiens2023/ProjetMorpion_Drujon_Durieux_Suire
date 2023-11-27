import { create } from "zustand"
import { Pion } from "../App"

interface useSelectedPionType {
    selectedPion: Pion | null
    setSelectedPion: (pion: Pion) => void
    resetSelectedPion: () => void
}

const useSelectedPion = create<useSelectedPionType>((set) => ({
    selectedPion: null,
    setSelectedPion: (pion: Pion) => set({ selectedPion: pion }),
    resetSelectedPion: () => set({ selectedPion: null }),
}))

export default useSelectedPion
