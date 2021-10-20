export const second = 1000
export const minute = second * 60

export function renderTime(time: number): string {
    const min = Math.floor(time / minute)
    const s = Math.floor((time - min * minute) / second)

    const minutes = String(min).padStart(2, "0")
    const seconds = String(s).padStart(2, "0")

    return `${minutes}:${seconds}`
}

export function renderDate(p: Date | undefined): string {
    if (!p) return ""

    const hours = p.getHours().toString().padStart(2, "0")
    const minutes = p.getMinutes().toString().padStart(2, "0")
    const timeString = `${hours}:${minutes}`

    let dateString
    if (sameDay(p, new Date())) {
        dateString = "Today"
    } else {
        dateString = p.toLocaleDateString()
    }

    return `${dateString} ${timeString}`
}

function sameDay(a: Date, b: Date): boolean {
    return (
        a.getFullYear() == b.getFullYear() &&
        a.getMonth() == b.getMonth() &&
        a.getDate() == b.getDate()
    )
}
