import { isSamePosition } from "../utils"
import { isMovableCase } from "../utils"

describe("isSamePosition", () => {
    it("should return true if the positions are the same", () => {
        expect(isSamePosition([1, 2], [1, 2])).toBe(true)
    })

    it("should return false if the positions are not the same", () => {
        expect(isSamePosition([9, 2], [1, 2])).toBe(false)
    })
})

describe("isMovableCase", () => {
    // Test pour le cas où la case est vide et adjacente au pion sélectionné
    it("should return true if the case is empty and adjacent to the selected pawn", () => {
        expect(isMovableCase([1, 1], [2, 2], null)).toBe(true);
    });

    // Test pour le cas où la case n'est pas adjacente au pion sélectionné
    it("should return false if the case is not adjacent to the selected pawn", () => {
        expect(isMovableCase([1, 1], [3, 3], null)).toBe(false);
    });

    // Test pour le cas où la case est adjacente, mais elle n'est pas vide
    it("should return false if the case is adjacent but not empty", () => {
        expect(isMovableCase([1, 1], [2, 2], "white")).toBe(false);
    });

    // Test pour le cas où la case est vide, mais elle n'est pas adjacente
    it("should return false if the case is empty but not adjacent to the selected pawn", () => {
        expect(isMovableCase([1, 1], [4, 4], null)).toBe(false);
    });
});