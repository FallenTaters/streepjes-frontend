import { apiEndpoint } from "./settings"

export async function getCatalog() {
    return await fetch(apiEndpoint + `/catalog`, {
        credentials: "include",
    })
}
