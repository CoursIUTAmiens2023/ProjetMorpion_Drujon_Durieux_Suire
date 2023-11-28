import { Pion } from "../App"

// show bleu case if this case there is ennemy spawn to eat
export function isEatableCase(
    selectedPion: Pion | null,
    position: number[],
    tab: Pion[],
    pion: Pion | null,
) {
    if (!selectedPion) return false

    const enemyColor = selectedPion.color === "black" ? "white" : "black"

    // show bleu case if this case there is pawn to eat
    const isEatMove = (dx: number, dy: number) => {
        // search 2 case distances empty case
        const isEmpyCase =
            position[0] === selectedPion.position[0] + 2 * dx &&
            position[1] === selectedPion.position[1] + 2 * dy &&
            pion?.color === null

        // search adjacent ennemy pawn
        const isAdjacentEnnemy =
            tab.find(
                (p) =>
                    p.position[0] === selectedPion.position[0] + dx &&
                    p.position[1] === selectedPion.position[1] + dy &&
                    p.color === enemyColor,
            ) !== undefined

        return isEmpyCase && isAdjacentEnnemy
    }

    return (
        isEatMove(-1, -1) ||
        isEatMove(-1, 1) ||
        isEatMove(1, 1) ||
        isEatMove(1, -1)
    )
}

// show bleu case if this case is movable
export function isMovableCase(
    selectedPion: Pion | null,
    position: number[],
    turn: number,
    pion: Pion | null,
) {
    if (!selectedPion) return false

    const isWhiteTurn = turn % 2 === 0

    // show the movable case for white pion
    const isAdjacentWhiteSquare =
        position[0] === selectedPion.position[0] - 1 &&
        (position[1] === selectedPion.position[1] - 1 ||
            position[1] === selectedPion.position[1] + 1)

    // show the movable case for black pion
    const isAdjacentBlackSquare =
        position[0] === selectedPion.position[0] + 1 &&
        (position[1] === selectedPion.position[1] + 1 ||
            position[1] === selectedPion.position[1] - 1)

    const isMoveAllowedForWhitePion =
        isWhiteTurn && isAdjacentWhiteSquare && pion?.color === null

    const isMoveAllowedForBlackPion =
        !isWhiteTurn && isAdjacentBlackSquare && pion?.color === null

    return isMoveAllowedForWhitePion || isMoveAllowedForBlackPion
}

// check if there is a pawn to eat
export function isPionToEat(selectedPion: Pion | null, tab: Pion[]) {
    if (!selectedPion) return false

    const enemyColor = selectedPion.color === "black" ? "white" : "black"

    const isPionToEatWithDirection = (dx: number, dy: number) => {
        const jumpX = selectedPion.position[0] + 2 * dx
        const jumpY = selectedPion.position[1] + 2 * dy

        // Check if the jump case is in the tab limit
        if (jumpX < 0 || jumpX >= 10 || jumpY < 0 || jumpY >= 10) {
            return false
        }

        // Search an empty case at 2 cases distances
        const isEmptyCase =
            tab.find(
                (p) =>
                    p.position[0] === jumpX &&
                    p.position[1] === jumpY &&
                    p.color === null,
            ) !== undefined

        // Search adjacent ennemy pawn
        const isAdjacentEnemy =
            tab.find(
                (p) =>
                    p.position[0] === selectedPion.position[0] + dx &&
                    p.position[1] === selectedPion.position[1] + dy &&
                    p.color === enemyColor,
            ) !== undefined

        return isEmptyCase && isAdjacentEnemy
    }

    // Check in every pssibles direction
    return (
        isPionToEatWithDirection(1, 1) ||
        isPionToEatWithDirection(-1, 1) ||
        isPionToEatWithDirection(1, -1) ||
        isPionToEatWithDirection(-1, -1)
    )
}

export function MendatoryEat(tab: Pion[], turn: number) {
    const allyPawnColor = turn % 2 === 0 ? "black" : "white"

    const tabToCheck = tab.filter(
        (p) => p.color === allyPawnColor && p.color !== null,
    )

    const returnValue: Pion[] = []
    tabToCheck.forEach((p) => {
        if (isPionToEat(p, tab)) {
            returnValue.push(p)
        }
    })
    return returnValue
}

// check if the position is the sames
export function isSamePosition(pos1: number[], pos2: number[]) {
    return pos1[0] === pos2[0] && pos1[1] === pos2[1]
}
