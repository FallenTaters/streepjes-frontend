import { Club } from "./member"

export const Role = {
    NotAuthorized: "not_authorized",
    Admin: "admin",
    Bartender: "bartender",
}

export interface User {
    username: string
    password?: string
    club: Club
    name: string
    role: string
}
