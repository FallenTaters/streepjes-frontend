export const second = 1000
export const minute = second * 60

export function renderTime(time: number): string {
    const min = Math.floor(time / minute)
    const s = Math.floor((time - min * minute) / second)

    const minutes = String(min).padStart(2, "0")
    const seconds = String(s).padStart(2, "0")

    return `${minutes}:${seconds}`
}

export function renderDate(p: Date): string {
    if (p.getDay() == new Date().getDay()) {
        return `${p
            .getHours()
            .toString()
            .padStart(2, "0")}:${p
            .getMinutes()
            .toString()
            .padStart(2, "0")}`
    }
    return p.toDateString()
}
