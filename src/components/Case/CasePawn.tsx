import { useTurnPion } from "../../StateManager/GameManager"
import useSelectedPion from "../../StateManager/SelectedPion"
import useMandatoryPawn from "../../StateManager/MandatoryPawn"
import { useBorderColor, useIsMandatoryPawn } from "../../utils"
import { CaseProps } from "."

export function CasePawn({ bgColor, pion }: CaseProps) {
    const { position, color } = pion
    const setSelectedPion = useSelectedPion((state) => state.setSelectedPion)
    const selectedPion = useSelectedPion((state) => state.selectedPion)

    const turn = useTurnPion((state) => state.turn)

    const mandatoryPawn = useMandatoryPawn((state) => state.mandatoryPawn)

    //TODO: afficher si un coup est obligatoire

    // check if the pawn is a mandatory pawn
    const isMandatoryPawn = useIsMandatoryPawn(position, mandatoryPawn)

    const borderColor = useBorderColor(selectedPion, position, isMandatoryPawn)

    return (
        <div className={`relative h-14 w-14 ${bgColor}`}>
            <button
                onClick={() => {
                    // Sélectionner le pion ne peux jouer que si c'est son tour
                    if (
                        (turn % 2 !== 0 && color === "black") ||
                        (turn % 2 === 0 && color === "white")
                    ) {
                        // Ne peux jouer qu'un mandataryPawn si il y en a
                        if (mandatoryPawn && !isMandatoryPawn) return

                        setSelectedPion(pion)
                    }
                }}
            >
                <div
                    className={` m-2 h-10 w-10 rounded-full ${
                        color === "white"
                            ? "bg-white"
                            : color === "black"
                              ? "bg-black"
                              : ""
                    } ${borderColor}`}
                />
            </button>
        </div>
    )
}
