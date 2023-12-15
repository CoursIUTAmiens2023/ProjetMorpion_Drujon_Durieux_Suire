import { ColorPawn, Pion } from "../App"
import { DirectionalFunction } from "./type"

//# region utils

/**
 * Check the function in every direction
 * @param functionToCheck
 * @param params
 * @returns
 * true if the function is true at least in one direction
 */
export function functionInEveryDirection<T extends unknown[]>(
    functionToCheck: DirectionalFunction<T>,
    ...params: T
) {
    return (
        functionToCheck(1, 1, ...params) ||
        functionToCheck(1, -1, ...params) ||
        functionToCheck(-1, 1, ...params) ||
        functionToCheck(-1, -1, ...params)
    )
}

/**
 * Check if the position is the same between 2 pawns
 * @param pos1
 * @param pos2
 * @returns
 * true if the position is the same
 */
export function isSamePosition(pos1: number[], pos2: number[]) {
    return pos1[0] === pos2[0] && pos1[1] === pos2[1]
}

/**
 * Find the color of the ennemy
 * @param color
 * @returns
 * return the color of the ennemy
 */
export function ennemyColor(color: ColorPawn) {
    return color === "black" ? "white" : "black"
}

/**
 * Find the color of the player who play
 * @param turn
 * @returns
 * return the color of the player who play
 */
export function allyColor(turn: number) {
    return turn % 2 !== 0 ? "black" : "white"
}

/**
 * Check if the jump case is in the tab limit
 * @param jumpX
 * @param jumpY
 * @returns
 * true if the jump case is in the tab limit
 */
export function isInTabLimit(jumpX: number, jumpY: number) {
    return jumpX >= 0 && jumpX < 10 && jumpY >= 0 && jumpY < 10
}

/**
 * Check if the pawn is at the selection pawn position with step has the focus color
 * @param pawnPos
 * @param pawnColor
 * @param stepX
 * @param stepY
 * @param selectionPawnPos
 * @param focusColor
 * @returns
 * true if the pawn is at the selection pawn position with step has the focus color
 */
export function whichPawnAtPosition(
    pawn: { position: number[]; color: ColorPawn },
    stepX: number,
    stepY: number,
    selectionPawnPos: number[],
    focusColor: ColorPawn,
) {
    const { position: pawnPos, color: pawnColor } = pawn
    const selectPawnWithStep = [
        selectionPawnPos[0] + stepX,
        selectionPawnPos[1] + stepY,
    ]
    return (
        isSamePosition(pawnPos, selectPawnWithStep) && pawnColor === focusColor
    )
}

/**
 * Find the background color for the current case position of the grid
 * @param newPion
 * @returns
 * return color for the current case position of the grid
 */
export function findBgColorGrid(newPion: Pion) {
    if (newPion.position[0] % 2 === 0) {
        if (newPion.position[1] % 2 === 0) {
            return "bg-amber-900"
        } else {
            return "bg-amber-700"
        }
    } else {
        if (newPion.position[1] % 2 === 0) {
            return "bg-amber-700"
        } else {
            return "bg-amber-900"
        }
    }
}

//# endregion utils

//# region normal pawn

/**
 * Check if the selected move or eat at the edge of the board
 * @param selectedPion
 * @returns
 * Boolean
 */
export function isAtEdgeOfBoard(selectedPion: Pion) {
    if (!selectedPion) return false
    const { position: selectedPawnPos, color: selectedPawnColor } = selectedPion

    const isWhite = selectedPawnColor === "white"

    if (isWhite) {
        return selectedPawnPos[0] === 9
    } else {
        return selectedPawnPos[0] === 0
    }
}

/**
 * Check if the case is empty and adjacent to the selected pawn
 * @param selectedPawnPos
 * @param position
 * @param color
 * @returns
 * Boolean
 */
export function isMovableCase(
    selectedPawnPos: number[],
    position: number[],
    color: ColorPawn,
    turn: number,
) {
    const isWhiteTurn = turn % 2 === 0
    // show the movable case for white pion
    const isForwardWhite =
        position[0] === selectedPawnPos[0] - 1 &&
        (position[1] === selectedPawnPos[1] - 1 ||
            position[1] === selectedPawnPos[1] + 1)

    // show the movable case for black pion
    const isForwardBlack =
        position[0] === selectedPawnPos[0] + 1 &&
        (position[1] === selectedPawnPos[1] + 1 ||
            position[1] === selectedPawnPos[1] - 1)

    const isEmptyPawn = color === null

    const isMoveAllowedForWhitePion =
        !isWhiteTurn && isForwardWhite && isEmptyPawn

    const isMoveAllowedForBlackPion =
        isWhiteTurn && isForwardBlack && isEmptyPawn

    return isMoveAllowedForWhitePion || isMoveAllowedForBlackPion
}

/**
 * Check if the case can be hightlighted in blue for the selected pawn in one direction
 * @param selectedPion
 * @param tab
 * @param turn
 * @returns
 * Boolean
 */
export function isEatMoveWithDirection(
    stepX: number,
    stepY: number,
    selectedPion: Pion,
    pawn: { pawnPos: number[]; pawnColor: ColorPawn },
    tab: Pion[],
) {
    const { pawnPos, pawnColor } = pawn
    const jumpX = selectedPion.position[0] + 2 * stepX
    const jumpY = selectedPion.position[1] + 2 * stepY

    if (!isInTabLimit(jumpX, jumpY)) {
        return false
    }

    // search 2 case distances empty case
    const isEmpyCase = whichPawnAtPosition(
        { position: pawnPos, color: pawnColor },
        2 * stepX,
        2 * stepY,
        selectedPion.position,
        null,
    )

    // search adjacent ennemy pawn
    const isAdjacentEnnemy =
        tab.find(({ position, color }) =>
            whichPawnAtPosition(
                { position, color },
                stepX,
                stepY,
                selectedPion.position,
                ennemyColor(selectedPion.color),
            ),
        ) !== undefined

    return isEmpyCase && isAdjacentEnnemy
}

/**
 * Check if the case can be hightlighted in blue for the selected pawn in one direction
 * @param selectedPion
 * @param position
 * @param tab
 * @param color
 * @returns
 * Boolean
 */
export function isEatableCase(
    selectedPion: Pion,
    pawn: { pawnPos: number[]; pawnColor: ColorPawn },
    tab: Pion[],
) {
    if (selectedPion.isQueen) return false

    return functionInEveryDirection(
        isEatMoveWithDirection,
        selectedPion,
        pawn,
        tab,
    )
}

/**
 * Check if there is a pawn to eat in one direction
 * @param selectedPion
 * @param tab
 * @returns
 * Boolean
 */
export function isPionToEatWithDirection(
    stepX: number,
    stepY: number,
    selectedPion: Pion,
    tab: Pion[],
) {
    const jumpX = selectedPion.position[0] + 2 * stepX
    const jumpY = selectedPion.position[1] + 2 * stepY

    // Check if the jump case is in the tab limit
    if (!isInTabLimit(jumpX, jumpY)) {
        return false
    }

    // Search an empty case at 2 cases distances
    const isEmptyCase =
        tab.find((p) =>
            whichPawnAtPosition(
                { position: p.position, color: p.color },
                2 * stepX,
                2 * stepY,
                selectedPion.position,
                null,
            ),
        ) !== undefined

    // Search adjacent ennemy pawn
    const isAdjacentEnemy =
        tab.find((p) =>
            whichPawnAtPosition(
                { position: p.position, color: p.color },
                stepX,
                stepY,
                selectedPion.position,
                ennemyColor(selectedPion.color),
            ),
        ) !== undefined

    return isEmptyCase && isAdjacentEnemy
}

/**
 * Check if there is a pawn to eat in every direction
 * @param selectedPion
 * @param tab
 * @returns
 * Boolean
 */
export function isPionToEat(selectedPion: Pion, tab: Pion[]) {
    // Check in every pssibles direction
    return functionInEveryDirection(isPionToEatWithDirection, selectedPion, tab)
}

/**
 * Check if there is a pawn to eat for the all the ally pawn which are not queen
 * @param tab
 * @param turn
 * @returns
 * List of mandatory pawn
 */
export function mendatoryEat(tab: Pion[], turn: number) {
    const allyPawnColor = allyColor(turn)

    const tabToCheck = tab.filter(
        (p) => p.color === allyPawnColor && !p.isQueen,
    )

    const returnValue: Pion[] = []
    tabToCheck.forEach((p) => {
        if (isPionToEat(p, tab)) {
            returnValue.push(p)
        }
    })

    return returnValue
}

//# endregion

//# region Queen pawn

// show moveable blue case for queen

export function findMovableCaseDirection(
    stepX: number,
    stepY: number,
    movableCases: number[][],
    selectedPion: Pion,
    tab: Pion[],
) {
    const { position: selectedPawnPos, color: selectedPawnColor } = selectedPion

    const row = selectedPawnPos[0] + stepX
    const col = selectedPawnPos[1] + stepY
    const stepPos = [row, col]

    let isEatablePawnInWay = false
    const allyColor = selectedPawnColor

    while (isInTabLimit(stepPos[0], stepPos[1])) {
        // Check if threre's a pawn at the current direction
        const pawnAtPosition = tab.find((p) =>
            isSamePosition(p.position, stepPos),
        ) ?? { color: null }

        if (pawnAtPosition.color === null) {
            // If the case is empty, add it to the movable cases
            movableCases.push([row, col])
        } else if (pawnAtPosition.color === allyColor) {
            // If the case is occupied by an ally pawn,
            break
        } else if (!isEatablePawnInWay) {
            // If the case is occupied by an enemy pawn, pass on the next case
            isEatablePawnInWay = true
        } else if (isEatablePawnInWay) {
            // If there's already a pawn in the way, break the loop
            break
        }

        stepPos[0] += stepX
        stepPos[1] += stepY
    }

    return movableCases
}

export function queenMovableCase(selectedPion: Pion, tab: Pion[]) {
    const movableCases: number[][] = []

    console.log(
        "1",
        findMovableCaseDirection(-1, -1, movableCases, selectedPion, tab),
        "2",
        findMovableCaseDirection(1, -1, movableCases, selectedPion, tab),
    )

    const addedMoveableCases = movableCases.concat(
        findMovableCaseDirection(1, 1, movableCases, selectedPion, tab),
        findMovableCaseDirection(1, -1, movableCases, selectedPion, tab),
        findMovableCaseDirection(-1, 1, movableCases, selectedPion, tab),
        findMovableCaseDirection(-1, -1, movableCases, selectedPion, tab),
    )

    return addedMoveableCases
}

// check if there is a pawn to eat for the queen
export function isPawnToEatForQueen(selectedPion: Pion, tab: Pion[]) {
    const _ennemyColor = ennemyColor(selectedPion.color)
    const isPawnToEatWithDirectionForQueen = (dx: number, dy: number) => {
        let jumpX = selectedPion.position[0] + dx
        let jumpY = selectedPion.position[1] + dy
        let isEatablePawnInWay = false

        const allyColor = selectedPion.color

        // Check if the jump case is in the tab limit
        while (isInTabLimit(jumpX, jumpY)) {
            const pionAtPosition = tab.find(
                (p) => p.position[0] === jumpX && p.position[1] === jumpY,
            )

            if (pionAtPosition?.color === null) {
                // If the case is occupied by an ally pawn,
                if (isEatablePawnInWay) {
                    // If there's already a pawn in the way, break the loop
                    return true
                }
            } else if (pionAtPosition?.color === allyColor) {
                // If the case is occupied by an ally pawn,
                return false
            } else if (pionAtPosition?.color === _ennemyColor) {
                // If the case is occupied by an enemy pawn, pass on the next case
                if (isEatablePawnInWay) {
                    // If there's already a pawn in the way, break the loop
                    return false
                }
                isEatablePawnInWay = true
            }

            jumpX += dx
            jumpY += dy
        }

        return false // No pawns found in this direction
    }

    // Check in every possible direction
    return functionInEveryDirection(isPawnToEatWithDirectionForQueen)
}

export function mendatoryEatForQueen(tab: Pion[], turn: number) {
    const allyPawnColor = allyColor(turn)

    const isAllyQueen = (p: Pion) => p.color === allyPawnColor && p.isQueen

    const tabToCheck = tab.filter((p) => isAllyQueen(p))

    const returnValue: Pion[] = []
    tabToCheck.forEach((p) => {
        if (isPawnToEatForQueen(p, tab)) {
            returnValue.push(p)
        }
    })

    return returnValue
}

//# endregion
