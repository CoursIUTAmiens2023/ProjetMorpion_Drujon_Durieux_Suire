import { create } from "zustand"
import { Pion } from "../App"

interface useMandatoryPawnType {
    mandatoryPawn: Pion[] | null
    setMandatoryPawn: (pions: Pion[]) => void
    resetMandatoryPawn: () => void
}

const useMandatoryPawn = create<useMandatoryPawnType>((set) => ({
    mandatoryPawn: null,
    setMandatoryPawn: (pions: Pion[]) => {
        set({ mandatoryPawn: pions })
    },
    resetMandatoryPawn: () => set({ mandatoryPawn: null }),
}))

export default useMandatoryPawn
