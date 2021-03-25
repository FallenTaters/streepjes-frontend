import { apiEndpoint } from "./settings"
import { useStore } from "vuex"

export async function getCatalog() {
    const store = useStore()
    return await fetch(apiEndpoint + `/catalog`, {
        credentials: "include",
    })
        .then(resp => resp.json())
        .then(data => {
            store.commit("setCategories", data.categories)
            store.commit("setProducts", data.products)
        })
}
