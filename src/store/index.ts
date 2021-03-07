import { createStore } from "vuex"

interface Category {
    id: number
    name: string
}

interface Product {
    id: number
    category: number
    name: string
    price: number
}
interface MyStore {
    categories: Category[]
    products: Product[]
}

export default createStore({
    state(): MyStore {
        return {
            categories: [
                {
                    id: 1,
                    name: "drinks",
                },
                {
                    id: 2,
                    name: "food",
                },
            ],
            products: [
                {
                    id: 1,
                    name: "Grolsch",
                    category: 1,
                    price: 150,
                },
                {
                    id: 2,
                    name: "Leffe Tripel",
                    category: 1,
                    price: 250,
                },
                {
                    id: 3,
                    name: "Fris",
                    category: 1,
                    price: 120,
                },
                {
                    id: 4,
                    name: "tosti kaas",
                    category: 2,
                    price: 100,
                },
                {
                    id: 5,
                    name: "Tosti ham n kaas",
                    category: 2,
                    price: 120,
                },
                {
                    id: 6,
                    name: "borrelnootjes",
                    category: 2,
                    price: 150,
                },
            ],
        }
    },
    getters: {
        getCategories(state: MyStore) {
            return state.categories
        },
        getProducts(state: MyStore) {
            return state.products
        },
    },
    mutations: {},
    actions: {},
    modules: {},
})
