import { useEffect } from "react"
import { Case, CasePawn, CaseQueen } from "./components/Case"
import { useTabPion, useTurnPion } from "./StateManager/GameManager"
import { MendatoryEat } from "./utils"
import useMandatoryPawn from "./StateManager/MandatoryPawn"

export type ColorPawn = "white" | "black" | null

export interface Pion {
    color: ColorPawn
    position: number[]
    isQueen: boolean
}

export default function App() {
    const tab = useTabPion((state) => state.tab)
    const turn = useTurnPion((state) => state.turn)
    const setMandatoryPawn = useMandatoryPawn((state) => state.setMandatoryPawn)
    const resetMandatoryPawn = useMandatoryPawn(
        (state) => state.resetMandatoryPawn,
    )

    useEffect(() => {
        const mendatoryPawn = MendatoryEat(tab, turn)
        if (mendatoryPawn.length > 0) {
            setMandatoryPawn(mendatoryPawn)
        } else {
            resetMandatoryPawn()
        }
    }, [tab, turn])

    return (
        <div className="flex h-full w-full items-center justify-center bg-amber-500">
            <div
                className={`flex max-w-[568px] flex-wrap rounded-md border-4 border-black
                `}
            >
                {tab.map((pion, i) => {
                    const newPion =
                        turn % 2 !== 0 ? pion : tab[tab.length - 1 - i]

                    const bgColor =
                        newPion.position[0] % 2 === 0
                            ? newPion.position[1] % 2 === 0
                                ? "bg-amber-900"
                                : "bg-amber-700"
                            : newPion.position[1] % 2 === 0
                              ? "bg-amber-700"
                              : "bg-amber-900"

                    if (newPion.color === null) {
                        return <Case key={i} bgColor={bgColor} pion={newPion} />
                    } else if (newPion.isQueen) {
                        return (
                            <CaseQueen
                                key={i}
                                bgColor={bgColor}
                                pion={newPion}
                            />
                        )
                    } else {
                        return (
                            <CasePawn
                                key={i}
                                bgColor={bgColor}
                                pion={newPion}
                            />
                        )
                    }
                })}
            </div>
        </div>
    )
}
