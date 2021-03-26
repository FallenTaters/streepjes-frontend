import { apiEndpoint } from "./settings"

export async function getMembers() {
    return await fetch(apiEndpoint + `/members`, {
        credentials: "include",
    })
}
