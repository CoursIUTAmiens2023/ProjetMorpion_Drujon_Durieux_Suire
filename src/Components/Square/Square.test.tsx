import { describe, expect, it } from "@jest/globals"
import { render } from "@testing-library/react"
import { Square } from "."

describe("Square", () => {
    it("should match the snapshot when value null", () => {
        const { container } = render(
            <Square value={null} onClick={() => {}} id={0} />,
        )
        expect(container).toMatchSnapshot()
    })
    it("should match the snapshot when value X", () => {
        const { container } = render(
            <Square value="X" onClick={() => {}} id={0} />,
        )
        expect(container).toMatchSnapshot()
    })
    it("should match the snapshot when value O", () => {
        const { container } = render(
            <Square value="O" onClick={() => {}} id={0} />,
        )
        expect(container).toMatchSnapshot()
    })
})
