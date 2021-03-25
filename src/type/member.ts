export enum Club {
    Unknown,
    Parabool,
    Gladiators,
}

export interface Member {
    id: number
    club: Club
    name: string
    debt: number
}
