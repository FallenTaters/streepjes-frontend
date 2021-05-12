import { apiEndpoint } from "./settings"
import { doFetch } from "./type"
import { Catalog } from "@/type/catalog"

export async function getCatalog(): Promise<Catalog> {
    return await doFetch<Catalog>(apiEndpoint + "/catalog")
}
