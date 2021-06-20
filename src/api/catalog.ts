import { apiEndpoint } from "./settings"
import { doFetch } from "./type"
import { Catalog, Category, Product } from "@/type/catalog"

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

export function deleteProduct(id: number): Promise<Response> {
    return fetch(apiEndpoint + "/product/delete/" + id, {
        method: "POST",
        credentials: "include",
    })
}

export function postCategory(category: Category): Promise<Response> {
    return fetch(apiEndpoint + "/category", {
        method: "POST",
        body: JSON.stringify(category),
        credentials: "include",
    })
}

export function deleteCategory(id: number): Promise<Response> {
    return fetch(apiEndpoint + "/category/delete/" + id, {
        method: "POST",
        credentials: "include",
    })
}
