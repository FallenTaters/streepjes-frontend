import { apiEndpoint } from "./settings"
import { Category, Product } from "@/type/type"
import { useStore } from "vuex"

export async function getCatalog() {
    const store = useStore()
    return await fetch(apiEndpoint + `/catalog`)
        .then(resp => resp.json())
        .then(data => {
            const categories = []
            const products = []
            for (const category of data.categories) {
                categories.push(new Category(category))
            }
            for (const product of data.products) {
                product.priceParabool = product.price_parabool
                product.priceGladiators = product.price_gladiators
                product.category = product.category_id
                products.push(new Product(product))
            }
            store.commit("setCategories", categories)
            store.commit("setProducts", products)
        })
}
