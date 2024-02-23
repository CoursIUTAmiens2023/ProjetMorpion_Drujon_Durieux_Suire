import React, { useCallback, useEffect, useRef } from "react"
import ReactCanvasConfetti, {
    ConfettiProps,
    ConfettiInstance,
} from "react-canvas-confetti"

interface CanvasConfettiRef {
    fire: (particleRatio: number, opts: ConfettiProps) => void
}

export function Confetti() {
    const refAnimationInstance = useRef<CanvasConfettiRef | null>(null)

    useEffect(() => {
        const getInstance = (instance: ConfettiInstance) => {
            refAnimationInstance.current = {
                fire: (particleRatio, opts) =>
                    instance({
                        ...opts,
                        origin: { y: 0.7 },
                        particleCount: Math.floor(200 * particleRatio),
                    }),
            }
        }
        return () => {
            refAnimationInstance.current = null
        }
    }, [])

    useEffect(() => {
        fire()
    }, [])

    const fire = useCallback(() => {
        if (!refAnimationInstance.current) return

        refAnimationInstance.current.fire(0.25, {
            spread: 26,
            startVelocity: 55,
        })

        refAnimationInstance.current.fire(0.2, {
            spread: 60,
        })

        refAnimationInstance.current.fire(0.35, {
            spread: 100,
            decay: 0.91,
            scalar: 0.8,
        })

        refAnimationInstance.current.fire(0.1, {
            spread: 120,
            startVelocity: 25,
            decay: 0.92,
            scalar: 1.2,
        })

        refAnimationInstance.current.fire(0.1, {
            spread: 120,
            startVelocity: 45,
        })
    }, [])

    return (
        <ReactCanvasConfetti className="pointer-events-none fixed inset-0 size-full" />
    )
}
