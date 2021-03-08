import { apiEndpoint } from "./settings"

export async function getCatalog(username: string, password: string) {
    return await fetch(apiEndpoint + `/catalog`)
}
