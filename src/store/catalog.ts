import { StoreOptions } from "vuex"
import { Category, Product } from "@/type/catalog"

interface CatalogStore {
    categories: Category[]
    products: Product[]
}

const store: StoreOptions<CatalogStore> = {
    state: {
        categories: [],
        products: [],
    },
}

export default store
