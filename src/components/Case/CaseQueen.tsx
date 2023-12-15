import { FaCrown } from "react-icons/fa"
import { useTurnPion } from "../../StateManager/GameManager"
import useMandatoryPawn from "../../StateManager/MandatoryPawn"
import useSelectedPion from "../../StateManager/SelectedPion"
import { CaseProps } from "."
import {
    chooseColorPawnBg,
    useBorderColor,
    useIsMandatoryPawn,
} from "../../utils"

export function CaseQueen({ bgColor, pion }: CaseProps) {
    const { position, color } = pion
    const setSelectedPion = useSelectedPion((state) => state.setSelectedPion)

    const selectedPion = useSelectedPion((state) => state.selectedPion)

    const turn = useTurnPion((state) => state.turn)

    const mandatoryPawn = useMandatoryPawn((state) => state.mandatoryPawn)

    const isMandatoryPawn = useIsMandatoryPawn(position, mandatoryPawn)

    const borderColor = useBorderColor(selectedPion, position, isMandatoryPawn)

    return (
        <div className={`relative h-14 w-14 ${bgColor}`}>
            <button
                onClick={() => {
                    // Sélectionner le pion ne peux jouer que si c'est son tour
                    if (turn % 2 !== 0 && color === "white") return
                    if (turn % 2 === 0 && color === "black") return
                    // Ne peux jouer qu'un mandataryPawn si il y en a
                    if (mandatoryPawn && !isMandatoryPawn) return

                    setSelectedPion(pion)
                }}
            >
                <div
                    className={` m-2 h-10 w-10 rounded-full ${chooseColorPawnBg(
                        color,
                    )} ${borderColor}`}
                >
                    <span className="flex h-full items-center justify-center text-xl text-yellow-500">
                        <FaCrown />
                    </span>
                </div>
            </button>
        </div>
    )
}
