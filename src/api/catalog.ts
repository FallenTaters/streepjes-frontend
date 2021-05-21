import { apiEndpoint } from "./settings"
import { doFetch } from "./type"
import { Catalog, Product } from "@/type/catalog"

export async function getCatalog(): Promise<Catalog> {
    return await doFetch<Catalog>(apiEndpoint + "/catalog")
}

export function postProduct(product: Product): Promise<Response> {
    return fetch(apiEndpoint + "/product", {
        method: "POST",
        body: JSON.stringify(product),
        credentials: "include",
    })
}
