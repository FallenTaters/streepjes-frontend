import { User } from "@/type/user"
import { apiEndpoint } from "./settings"

export async function getUsers(): Promise<Response> {
    return await fetch(apiEndpoint + `/users`, {
        credentials: "include",
    })
}

export async function postUser(user: User): Promise<Response> {
    return await fetch(apiEndpoint + `/user`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(user),
    })
}

export function deleteUser(username: string): Promise<Response> {
    return fetch(apiEndpoint + "/user/delete/" + username, {
        method: "POST",
        credentials: "include",
    })
}
