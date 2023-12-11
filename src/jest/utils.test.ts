import { isSamePosition } from "../utils"

describe("isSamePosition", () => {
    it("should return true if the positions are the same", () => {
        expect(isSamePosition([1, 2], [1, 2])).toBe(true)
    })

    it("should return false if the positions are not the same", () => {
        expect(isSamePosition([9, 2], [1, 2])).toBe(false)
    })
})
