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

    const isEatableCaseMemo = useMemo(
        () => isEatableCase(selectedPion, position, tab, pion),
        [selectedPion, position, tab, pion],
    )

    const isMovableCaseMemo = useMemo(
        () => isMovableCase(selectedPion, position, turn, pion),
        [selectedPion, position, turn, pion],
    )

    // move the pawn
    const Move = useCallback(() => {
        if (!selectedPion) return

        const updatedTab = tab.map((p) => {
            // delete the pawn from the old position
            if (isSamePosition(p.position, selectedPion.position)) {
                return {
                    color: null,
                    position: p.position,
                }
            }

            // add the pawn to the new position
            if (isSamePosition(p.position, position)) {
                return {
                    color: selectedPion.color,
                    position: p.position,
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
                    color: null,
                    position: p.position,
                }
            }

            // add the pawn to the new position
            if (isSamePosition(p.position, position)) {
                return {
                    color: selectedPion.color,
                    position: p.position,
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
                    color: null,
                    position: p.position,
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
                        // select the pawn
                        if (turn % 2 === 0 && pion.color === "black") {
                            setSelectedPion(pion)
                        } else if (turn % 2 !== 0 && pion.color === "white") {
                            setSelectedPion(pion)
                        }
                    } else if (isMovableCaseMemo) {
                        // if the player click on moveable case (blue case)
                        Move()
                    } else if (isEatableCaseMemo) {
                        // if the player click eatable case (blue case)
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
                        } ${
                            selectedPion &&
                            isSamePosition(position, selectedPion.position)
                                ? "border-4 border-red-600"
                                : ""
                        }`}
                    />
                )}
            </button>
        </div>
    )
}
