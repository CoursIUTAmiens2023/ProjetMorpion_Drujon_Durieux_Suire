import { useMemo } from "react"
import { isSamePosition } from "."
import { Pawn } from "../App"

export function useIsMandatoryPawn(
    position: number[],
    mandatoryPawn: Pawn[] | null,
) {
    const isMandatoryPawn = useMemo(() => {
        return mandatoryPawn?.some((p) => isSamePosition(p.position, position))
    }, [mandatoryPawn, position, isSamePosition])

    return isMandatoryPawn ?? false
}

// find the good border color for the pawn
export function useBorderColor(
    selectedPion: Pawn | null,
    position: number[],
    isMandatoryPawn: boolean,
) {
    const borderColor = useMemo(() => {
        if (isMandatoryPawn) {
            return "border-4 border-yellow-500"
        } else if (
            selectedPion &&
            isSamePosition(position, selectedPion.position)
        ) {
            return "border-4 border-red-600"
        }
        return ""
    }, [position, selectedPion, isSamePosition, isMandatoryPawn])

    return borderColor
}
