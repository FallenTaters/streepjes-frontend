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

export function emptyMember(): Member {
    return {
        id: 0,
        club: Club.Unknown,
        name: "",
        debt: 0,
    }
}
