import { apiEndpoint } from "./settings"

export async function getMembers(): Promise<Response> {
    return await fetch(apiEndpoint + `/members`, {
        credentials: "include",
    })
}
