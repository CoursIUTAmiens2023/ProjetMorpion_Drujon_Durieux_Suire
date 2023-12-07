import { useCallback, useMemo } from "react"
import { Pion } from "../../App"
import { useTabPion, useTurnPion } from "../../StateManager/GameManager"
import useSelectedPion from "../../StateManager/SelectedPion"
import {
    isEatableCase,
    isMovableCase,
    isPawnToEatForQueen,
    isPionToEat,
    isSamePosition,
    queenMovableCase,
} from "../../utils/utilsFunction"
import useMandatoryPawn from "../../StateManager/MandatoryPawn"

export interface CaseProps {
    bgColor: string
    pion: Pion
}

export function Case({ bgColor, pion }: CaseProps) {
    const { position, color } = pion
    const resetSelectedPion = useSelectedPion(
        (state) => state.resetSelectedPion,
    )
    const selectedPion = useSelectedPion((state) => state.selectedPion)

    const pastTurn = useTurnPion((state) => state.pastTurn)
    const turn = useTurnPion((state) => state.turn)

    const setTab = useTabPion((state) => state.setTab)
    const tab = useTabPion((state) => state.tab)

    const mandatoryPawn = useMandatoryPawn((state) => state.mandatoryPawn)

    // check if the case is eatable for the pawn
    const isEatableCaseMemo = useMemo(
        () =>
            selectedPion &&
            selectedPion.isQueen === false &&
            isEatableCase(
                selectedPion,
                { pawnPos: position, pawnColor: color },
                tab,
            ),
        [selectedPion, position, tab, color],
    )

    // check if the case is movable for the pawn
    const isMovableCaseMemo = useMemo(() => {
        if (mandatoryPawn) return false

        return (
            selectedPion &&
            selectedPion.isQueen === false &&
            isMovableCase(selectedPion.position, position, color)
        )
    }, [selectedPion, position, turn, color, mandatoryPawn])

    // check if the case is movable or eatable for the queen
    const isQueenMovableCaseMemo = useMemo(() => {
        if (selectedPion && selectedPion.isQueen) {
            // check is the case is on diagonal with the selected pion
            const isOnDiagonal =
                Math.abs(selectedPion.position[0] - position[0]) ===
                Math.abs(selectedPion.position[1] - position[1])
            if (!isOnDiagonal) return false

            const queenMovableListCase = queenMovableCase(selectedPion, tab)
            return queenMovableListCase.some((queenMovableCase) =>
                isSamePosition(queenMovableCase, position),
            )
        }

        return false
    }, [selectedPion, position, color])

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

    const MoveQueen = useCallback(() => {
        if (!selectedPion) return

        // get the vector director
        const vectorDirector = [
            Math.sign(position[0] - selectedPion.position[0]),
            Math.sign(position[1] - selectedPion.position[1]),
        ]

        const potentialPawnToRemove: number[][] = []

        // Generate positions of the potentil pawns to remove
        for (
            let i = 1;
            i <
            Math.max(
                Math.abs(position[0] - selectedPion.position[0]),
                Math.abs(position[1] - selectedPion.position[1]),
            );
            i++
        ) {
            const newPosition = [
                selectedPion.position[0] + i * vectorDirector[0],
                selectedPion.position[1] + i * vectorDirector[1],
            ]

            potentialPawnToRemove.push(newPosition)
        }

        const ennemyColor = selectedPion.color === "white" ? "black" : "white"
        let ennemyKilled = false

        const updatedTab = tab.map((p) => {
            // delete the pawn from the old position
            if (isSamePosition(p.position, selectedPion.position)) {
                return {
                    ...p,
                    color: null,
                }
            }

            // if there's a pawn in the path, delete it
            if (
                potentialPawnToRemove.some((pos) =>
                    isSamePosition(pos, p.position),
                ) &&
                p.color === ennemyColor
            ) {
                ennemyKilled = true
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

        // if (mandatoryPawn) {
        //     const newMandatory = mandatoryPawn.filter(
        //         (pawn) => !isSamePosition(pawn.position, selectedPion.position),
        //     )
        //     console.log(newMandatory)
        //     console.log(selectedPion.position)
        //     if (newMandatory.length === 0) {
        //         resetSelectedPion()
        //         pastTurn()
        //     }
        // } else {
        //     resetSelectedPion()
        //     pastTurn()
        // }

        // update the tab
        setTab(updatedTab)
        selectedPion.position = position

        if (!isPawnToEatForQueen(selectedPion, updatedTab) || !ennemyKilled) {
            resetSelectedPion()
            pastTurn()
        }
    }, [
        selectedPion,
        position,
        tab,
        setTab,
        resetSelectedPion,
        pastTurn,
        mandatoryPawn,
    ])

    return (
        <div className={`relative h-14 w-14 ${bgColor}`}>
            <button
                className={
                    isMovableCaseMemo ||
                    isEatableCaseMemo ||
                    isQueenMovableCaseMemo
                        ? " h-full w-full bg-blue-500 opacity-50"
                        : ""
                }
                onClick={() => {
                    if (isMovableCaseMemo) {
                        // Si le joueur clique sur une case déplaçable (case bleue)
                        Move()
                    } else if (isEatableCaseMemo) {
                        // Si le joueur clique sur une case mangeable (case bleue)
                        eatPion()
                    } else if (isQueenMovableCaseMemo) {
                        // Si le joueur clique sur une case déplaçable (case bleue)
                        MoveQueen()
                    }
                }}
            />
        </div>
    )
}
