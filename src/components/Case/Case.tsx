import { useCallback, useMemo } from "react"
import { Pawn } from "../../App"
import { useTabPion, useTurnPion } from "../../StateManager/GameManager"
import useSelectedPion from "../../StateManager/SelectedPion"
import {
    isAtEdgeOfBoard,
    isEatableCase,
    isMovableCase,
    isPawnToEatForQueen,
    isPionToEat,
    isSamePosition,
    promoteSelectedPawn,
    queenMovableCase,
    updateGridEatPawn,
    updateGridMovePawn,
} from "../../utils/utilsFunction"
import useMandatoryPawn from "../../StateManager/MandatoryPawn"

export interface CaseProps {
    bgColor: string
    pion: Pawn
}

export function Case({ bgColor, pion }: CaseProps) {
    const { position: casePos, color: caseColor } = pion
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
    const isEatableCaseMemo = useMemo(() => {
        if (!selectedPion) return false

        return isEatableCase(
            selectedPion,
            { pawnPos: casePos, pawnColor: caseColor },
            tab,
        )
    }, [selectedPion, casePos, tab, caseColor])

    // check if the case is movable for the pawn
    const isMovableCaseMemo = useMemo(() => {
        if (mandatoryPawn || !selectedPion || selectedPion.isQueen) return false

        return isMovableCase(selectedPion.position, casePos, caseColor, turn)
    }, [selectedPion, casePos, turn, caseColor, mandatoryPawn])

    // check if the case is movable or eatable for the queen
    const isQueenMovableCaseMemo = useMemo(() => {
        if (!selectedPion || selectedPion.isQueen === false) return false
        // check is the case is on diagonal with the selected pion
        const isOnDiagonal =
            Math.abs(selectedPion.position[0] - casePos[0]) ===
            Math.abs(selectedPion.position[1] - casePos[1])
        if (!isOnDiagonal) return false

        const queenMovableListCase = queenMovableCase(selectedPion, tab)
        return queenMovableListCase.some((queenMovableCase) =>
            isSamePosition(queenMovableCase, casePos),
        )
    }, [selectedPion, casePos, caseColor])

    // move the pawn
    const MovePawn = useCallback(() => {
        if (!selectedPion) return

        const updatedTab = updateGridMovePawn(tab, selectedPion, casePos)

        selectedPion.position = casePos

        if (isAtEdgeOfBoard(selectedPion)) {
            promoteSelectedPawn(updatedTab, selectedPion)
        }

        setTab(updatedTab)
        resetSelectedPion()
        pastTurn()
    }, [selectedPion, casePos, tab, setTab, resetSelectedPion, pastTurn])

    // eat the pawn (move the pawn and delete the pawn to eats)
    const eatPawn = useCallback(() => {
        if (!selectedPion) return

        const updatedTab = updateGridEatPawn(tab, selectedPion, casePos)

        // update the selected pion position
        selectedPion.position = casePos

        if (isAtEdgeOfBoard(selectedPion)) {
            promoteSelectedPawn(updatedTab, selectedPion)
        }

        // update the tab
        setTab(updatedTab)

        // if the pawn can eat again
        if (!isPionToEat(selectedPion, updatedTab)) {
            // reset the selected pion and past the turns
            resetSelectedPion()
            pastTurn()
        }
    }, [selectedPion, casePos, tab, setTab, resetSelectedPion, pastTurn])

    const MoveQueen = useCallback(() => {
        if (!selectedPion) return

        // get the vector director
        const vectorDirector = [
            Math.sign(casePos[0] - selectedPion.position[0]),
            Math.sign(casePos[1] - selectedPion.position[1]),
        ]

        const potentialPawnToRemove: number[][] = []

        // Generate positions of the potentil pawns to remove
        for (
            let i = 1;
            i <
            Math.max(
                Math.abs(casePos[0] - selectedPion.position[0]),
                Math.abs(casePos[1] - selectedPion.position[1]),
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
            if (isSamePosition(p.position, casePos)) {
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
        selectedPion.position = casePos

        if (!isPawnToEatForQueen(selectedPion, updatedTab) || !ennemyKilled) {
            resetSelectedPion()
            pastTurn()
        }
    }, [
        selectedPion,
        casePos,
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
                        MovePawn()
                    } else if (isEatableCaseMemo) {
                        // Si le joueur clique sur une case mangeable (case bleue)
                        eatPawn()
                    } else if (isQueenMovableCaseMemo) {
                        // Si le joueur clique sur une case déplaçable (case bleue)
                        MoveQueen()
                    }
                }}
            />
        </div>
    )
}
