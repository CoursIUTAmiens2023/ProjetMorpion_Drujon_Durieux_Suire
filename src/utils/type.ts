export type DirectionalFunction<T extends unknown[]> = (
    dx: number,
    dy: number,
    ...params: T
) => boolean
