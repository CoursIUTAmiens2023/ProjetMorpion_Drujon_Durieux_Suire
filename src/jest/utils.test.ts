import { allyColor, ennemyColor, isInTabLimit, isSamePosition, /*whichPawnAtPosition, functionInEveryDirection*/ } from "../utils"

describe("isSamePosition", () => {
    it("should return true if the positions are the same", () => {
        expect(isSamePosition([1, 2], [1, 2])).toBe(true)
    })

    it("should return false if the positions are not the same", () => {
        expect(isSamePosition([9, 2], [1, 2])).toBe(false)
    })
})

describe("ennemyColor",( ) => {
    it("should return true if the colors are different", () => {
        expect(ennemyColor("white")).toBe("black")
    })
    it("should return false if the colors are the same", () => {
        expect(ennemyColor("black")).toBe("white")
    })
})

// describe("functionInEveryDirection", () => {
//     it("should return true if the function is true in every direction", () => {
//         expect(functionInEveryDirection([1, 2], (x, y) => x > 0 && y > 0)).toBe(true)
//     })
//     it("should return false if the function is false in one direction", () => {
//         expect(functionInEveryDirection([1, 2], (x, y) => x > 0 && y < 0)).toBe(false)
//     })
// })


describe("allyColor", () => {
    it("should return true if the colors are the same", () => {
        expect(allyColor(3)).toBe("black")
    })
    it("should return false if the colors are different", () => {
        expect(allyColor(12)).toBe("white")
    })
})

describe("isInTabLimit", () => {
    it("should return true if the positions are in the tab", () => {
        expect(isInTabLimit(1,2)).toBe(true)
    })
    it("should return false if the positions are not in the tab", () => {
        expect(isInTabLimit(19, 2)).toBe(false)
    })
})

// describe("whichPawnAtPosition", () => {
//     it("should return true if the pawn is at the position", () => {
//         expect(whichPawnAtPosition([1,2], "white")).toBe(true)
//     })
//     it("should return false if the pawn is not at the position", () => {
//         expect(whichPawnAtPosition()).toBe(false)
//     })
// })