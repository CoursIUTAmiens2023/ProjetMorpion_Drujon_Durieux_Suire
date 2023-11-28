import { useCallback, useMemo } from "react"
import { Pion } from "../../App"
import { useTabPion, useTurnPion } from "../../StateManager/GameManager"
import useSelectedPion from "../../StateManager/SelectedPion"
import {
    isEatableCase,
    isMovableCase,
    isPionToEat,
    isSamePosition,
} from "../../utils/utilsFunction"
import useMandatoryPawn from "../../StateManager/MandatoryPawn"
import { FaCrown } from "react-icons/fa"

interface CaseProps {
    bgColor: string
    pion: Pion | null
    position: number[]
}

export function Case({ bgColor, pion, position }: CaseProps) {
    const setSelectedPion = useSelectedPion((state) => state.setSelectedPion)
    const resetSelectedPion = useSelectedPion(
        (state) => state.resetSelectedPion,
    )
    const selectedPion = useSelectedPion((state) => state.selectedPion)

    const pastTurn = useTurnPion((state) => state.pastTurn)
    const turn = useTurnPion((state) => state.turn)

    const setTab = useTabPion((state) => state.setTab)
    const tab = useTabPion((state) => state.tab)

    const mandatoryPawn = useMandatoryPawn((state) => state.mandatoryPawn)

    //TODO: afficher si un coup est obligatoire

    // check if the pawn is a mandatory pawn
    const isMandatoryPawn = useMemo(() => {
        if (!mandatoryPawn) return false
        return mandatoryPawn.some((p) => isSamePosition(p.position, position))
    }, [mandatoryPawn])

    // check if the case is eatable
    const isEatableCaseMemo = useMemo(
        () => isEatableCase(selectedPion, position, tab, pion),
        [selectedPion, position, tab, pion],
    )

    // check if the case is movable
    const isMovableCaseMemo = useMemo(() => {
        if (
            selectedPion &&
            mandatoryPawn?.some((p) =>
                isSamePosition(p.position, selectedPion.position),
            )
        )
            return false
        return isMovableCase(selectedPion, position, turn, pion)
    }, [selectedPion, position, turn, pion])

    // find the good border color for the pawn
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
    }, [mandatoryPawn, position, selectedPion])

    // move the pawn
    const Move = useCallback(() => {
        if (!selectedPion) return

        const updatedTab = tab.map((p) => {
            // delete the pawn from the old position
            if (isSamePosition(p.position, selectedPion.position)) {
                return {
                    ...p,
                    color: null,
                }
            }

            // add the pawn to the new position
            if (isSamePosition(p.position, position)) {
                return {
                    ...p,
                    color: selectedPion.color,
                }
            }

            return p
        })

        setTab(updatedTab)
        resetSelectedPion()
        pastTurn()
    }, [selectedPion, position, tab, setTab, resetSelectedPion, pastTurn])

    // eat the pawn (move the pawn and delete the pawn to eats)
    const eatPion = useCallback(() => {
        if (!selectedPion) return

        const updatedTab = tab.map((p) => {
            // delete the pawn from the old position
            if (isSamePosition(p.position, selectedPion.position)) {
                return {
                    ...p,
                    color: null,
                }
            }

            // add the pawn to the new position
            if (isSamePosition(p.position, position)) {
                return {
                    ...p,
                    color: selectedPion.color,
                }
            }

            // delete the pawn to eat
            const eatenPosition = [
                selectedPion.position[0] +
                    (position[0] - selectedPion.position[0]) / 2,
                selectedPion.position[1] +
                    (position[1] - selectedPion.position[1]) / 2,
            ]

            if (isSamePosition(p.position, eatenPosition)) {
                return {
                    ...p,
                    color: null,
                }
            }

            return p
        })

        // update the tab
        setTab(updatedTab)
        // update the selected pion position
        selectedPion.position = position

        // if the pawn can eat again
        if (!isPionToEat(selectedPion, updatedTab)) {
            // reset the selected pion and past the turns
            resetSelectedPion()
            pastTurn()
        }
    }, [selectedPion, position, tab, setTab, resetSelectedPion, pastTurn])

    if (!pion) return <div className={`relative h-14 w-14 ${bgColor}`}></div>

    return (
        <div className={`relative h-14 w-14 ${bgColor}`}>
            <button
                className={
                    isMovableCaseMemo || isEatableCaseMemo
                        ? " h-full w-full bg-blue-500 opacity-50"
                        : ""
                }
                onClick={() => {
                    if (pion.color !== null) {
                        // Sélectionner le pion ne peux jouer que si c'est son tour
                        if (
                            (turn % 2 === 0 && pion.color === "black") ||
                            (turn % 2 !== 0 && pion.color === "white")
                        ) {
                            // Ne peux jouer qu'un mandataryPawn si il y en a
                            if (!isMandatoryPawn) return

                            setSelectedPion(pion)
                        }
                    } else if (isMovableCaseMemo) {
                        // Si le joueur clique sur une case déplaçable (case bleue)
                        Move()
                    } else if (isEatableCaseMemo) {
                        // Si le joueur clique sur une case mangeable (case bleue)
                        eatPion()
                    }
                }}
            >
                {pion && (
                    <div
                        className={` m-2 h-10 w-10 rounded-full ${
                            pion.color === "white"
                                ? "bg-white"
                                : pion.color === "black"
                                  ? "bg-black"
                                  : ""
                        } ${borderColor}`}
                    >
                        {pion.isQueen && (
                            <span className="flex h-full items-center justify-center text-xl text-yellow-500">
                                <FaCrown />
                            </span>
                        )}
                    </div>
                )}
            </button>
        </div>
    )
}
