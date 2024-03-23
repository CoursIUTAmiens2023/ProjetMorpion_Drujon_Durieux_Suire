import { describe, expect, it } from "@jest/globals"
import { render } from "@testing-library/react"
import { Board } from "."

describe("Board", () => {
    it("should match the snapshot when square are null", () => {
        const { container } = render(
            <Board squares={Array(9).fill(null)} onClick={() => {}} />,
        )
        expect(container).toMatchSnapshot()
    })
    it("should match the snapshot when square are X", () => {
        const { container } = render(
            <Board squares={Array(9).fill("X")} onClick={() => {}} />,
        )
        expect(container).toMatchSnapshot()
    })
    it("should match the snapshot when square are O", () => {
        const { container } = render(
            <Board squares={Array(9).fill("O")} onClick={() => {}} />,
        )
        expect(container).toMatchSnapshot()
    })
})
