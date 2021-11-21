import { User } from "@/type/user"
import { Club } from "@/type/member"
import { apiEndpoint } from "./settings"
import { doFetch } from "./type"

export async function postLogin(
    username: string,
    password: string
): Promise<Response> {
    return await fetch(apiEndpoint + `/login`, {
        method: "POST",
        body: JSON.stringify({
            username: username,
            password: password,
        }),
        credentials: "include",
    })
}

export async function postActive(): Promise<Response> {
    return await fetch(apiEndpoint + `/active`, {
        method: "POST",
        credentials: "include",
    })
}

export async function postLogout(): Promise<Response> {
    return await fetch(apiEndpoint + `/logout`, {
        method: "POST",
        credentials: "include",
    })
}

export async function getClub(): Promise<Club> {
    return await doFetch(apiEndpoint + `/me/club`)
}

export async function getMe(): Promise<User> {
    return await doFetch(apiEndpoint + `/me`)
}

export async function postMePassword(): Promise<Response> {
    return await fetch(apiEndpoint + `/me/password`, {
        method: "POST",
        credentials: "include",
    })
}
