import { apiEndpoint } from "./settings"

export async function postLogin(username: string, password: string) {
    return await fetch(apiEndpoint + `/login`, {
        method: "POST",
        body: JSON.stringify({
            username: username,
            password: password,
        }),
        credentials: "include",
    })
}

export async function postActive() {
    return await fetch(apiEndpoint + `/active`, {
        method: "POST",
        credentials: "include",
    })
}

export async function postLogout() {
    return await fetch(apiEndpoint + `/logout`, {
        method: "POST",
        credentials: "include",
    })
}
