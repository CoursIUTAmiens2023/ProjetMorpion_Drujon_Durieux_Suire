import { useMemo } from "react"
import { Player } from "../../Utils/type"

interface SquareProps {
    id: number
    value: Player
    onClick: () => void
}

export function Square({ id, value, onClick }: SquareProps) {
    const colorValue = useMemo(() => {
        if (value === "X") return "text-red-600"
        if (value === "O") return "text-blue-600"
        return ""
    }, [value])

    return (
        <button
            className={`size-32 border-2 border-[#364439] bg-[#f1e8f7] ${colorValue}`}
            onClick={onClick}
            id={id.toString()}
        >
            <span className="text-4xl">{value}</span>
        </button>
    )
}
