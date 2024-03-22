import { useMemo } from "react"
import { Player } from "../../Utils/type"

interface SquareProps {
    value: Player
    onClick: () => void
}

export function Square({ value, onClick }: SquareProps) {
    const colorValue = useMemo(() => {
        if (value === "X") return "text-red-600"
        if (value === "O") return "text-blue-600"
        return ""
    }, [value])

    return (
        <button
            className={`size-32 border-2 border-[#364439] bg-[#e3ffea]  ${colorValue}`}
            onClick={onClick}
        >
            <span className="text-4xl">{value}</span>
        </button>
    )
}
