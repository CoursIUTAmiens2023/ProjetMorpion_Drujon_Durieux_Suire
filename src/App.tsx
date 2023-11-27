import { Case } from "./components/Case"
import { useTabPion, useTurnPion } from "./StateManager/GameManager"

export interface Pion {
    color: "white" | "black" | null
    position: number[]
}

export default function App() {
    const tab = useTabPion((state) => state.tab)
    const turn = useTurnPion((state) => state.turn)

    return (
        <div className="flex h-full w-full items-center justify-center bg-amber-500">
            <div
                className={`flex max-w-[568px] flex-wrap rounded-md border-4 border-black
                `}
            >
                {Array.from({ length: 10 }, (_, i) =>
                    Array.from({ length: 10 }, (_, j) => (
                        <Case
                            key={`${i}-${j}`}
                            position={turn % 2 === 0 ? [i, j] : [9 - i, 9 - j]}
                            bgColor={
                                i % 2 === 0
                                    ? j % 2 === 0
                                        ? "bg-amber-900"
                                        : "bg-amber-700"
                                    : j % 2 === 0
                                      ? "bg-amber-700"
                                      : "bg-amber-900"
                            }
                            pion={
                                turn % 2 === 0
                                    ? tab.find(
                                          (pion) =>
                                              pion.position[0] === i &&
                                              pion.position[1] === j,
                                      ) ?? null
                                    : tab.find(
                                          (pion) =>
                                              pion.position[0] === 9 - i &&
                                              pion.position[1] === 9 - j,
                                      ) ?? null
                            }
                        />
                    )),
                )}
            </div>
        </div>
    )
}
