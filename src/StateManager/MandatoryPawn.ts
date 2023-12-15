import { create } from "zustand"
import { Pawn } from "../App"

interface useMandatoryPawnType {
    mandatoryPawn: Pawn[] | null
    setMandatoryPawn: (pions: Pawn[]) => void
    resetMandatoryPawn: () => void
}

const useMandatoryPawn = create<useMandatoryPawnType>((set) => ({
    mandatoryPawn: null,
    setMandatoryPawn: (pions: Pawn[]) => {
        set({ mandatoryPawn: pions })
    },
    resetMandatoryPawn: () => set({ mandatoryPawn: null }),
}))

export default useMandatoryPawn
