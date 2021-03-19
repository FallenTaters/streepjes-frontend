import { apiEndpoint } from "./settings"

export async function postLogin(username: string, password: string) {
    return await fetch(apiEndpoint + `/login`, {
        method: "POST",
        body: JSON.stringify({
            username: username,
            password: password,
        }),
    })
}
