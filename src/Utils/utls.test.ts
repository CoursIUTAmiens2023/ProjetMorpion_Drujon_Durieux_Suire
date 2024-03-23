import { describe, expect, it } from "@jest/globals"
import { useCalculateStatus, useCalculateWinner } from "."

describe("calculateStatus", () => {
    it("if turn is even", () => {
        expect(useCalculateStatus(null, 0)).toBe("Prochain joueur : X")
    })
    it("if turn is odd", () => {
        expect(useCalculateStatus(null, 1)).toBe("Prochain joueur : O")
    })
    it("if winner is X", () => {
        expect(useCalculateStatus("X", 0)).toBe("X")
    })
    it("if winner is O", () => {
        expect(useCalculateStatus("O", 0)).toBe("O")
    })
    it("if turn is 9", () => {
        expect(useCalculateStatus(null, 9)).toBe("Match nul")
    })
})

describe("calculateWinner", () => {
    it("if there is a winner and it X", () => {
        expect(
            useCalculateWinner([
                "X",
                "X",
                "X",
                "O",
                "O",
                null,
                null,
                null,
                null,
            ]),
        ).toBe("X")
    })
    it("if there is a winner and it O", () => {
        expect(
            useCalculateWinner([
                "O",
                "O",
                "O",
                "X",
                "X",
                null,
                null,
                null,
                null,
            ]),
        ).toBe("O")
    })
    it("if there is no winner", () => {
        expect(
            useCalculateWinner(["X", "O", "X", "O", "O", "X", "O", "X", "O"]),
        ).toBe(null)
    })
})
