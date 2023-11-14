import { Case } from "./components/Case"

export default function App() {
    return (
        <div className="flex h-full w-full bg-background">
            <div className="flex h-full w-full items-center justify-center">
                <div className="flex max-w-[564px] flex-wrap">
                    {Array.from({ length: 10 }, (_, i) =>
                        Array.from({ length: 10 }, (_, j) => (
                            <Case
                                key={`${i}-${j}`}
                                bgColor={
                                    i % 2 === 0
                                        ? j % 2 === 0
                                            ? "bg-amber-900"
                                            : "bg-amber-700"
                                        : j % 2 === 0
                                          ? "bg-amber-700"
                                          : "bg-amber-900"
                                }
                            />
                        )),
                    )}
                </div>
            </div>
        </div>
    )
}
