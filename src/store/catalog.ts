import { Module } from "vuex"
import { Category, Product } from "@/type/catalog"
import { getCatalog } from "@/api/catalog"
import { LoadState } from "@/api/type"

interface CatalogStore {
    loadState: LoadState
    categories: Category[]
    products: Product[]
}

const store: Module<CatalogStore, object> = {
    state: {
        loadState: LoadState.NotLoaded,
        categories: [],
        products: [],
    },
    getters: {
        categories(state): Category[] {
            return state.categories
        },
        products(state): Product[] {
            return state.products
        },
        catalogLoadState(state): LoadState {
            return state.loadState
        },
    },
    mutations: {
        setCategories(state, categories: Category[]) {
            state.categories = categories
        },
        setProducts(state, products: Product[]) {
            state.products = products
        },
        setCatalogLoadState(state, newState: LoadState) {
            state.loadState = newState
        },
    },
    actions: {
        async fetchCatalog({ commit, dispatch }) {
            commit("setCatalogLoadState", LoadState.Loading)

            let resp
            try {
                resp = await getCatalog()
            } catch {
                commit("setCatalogLoadState", LoadState.Failed)
                return
            }

            let data
            switch (resp.status) {
                case 200:
                    data = await resp.json()
                    break

                case 401:
                    dispatch("unauthorized")
                    commit("setCatalogLoadState", LoadState.Failed)
                    return

                default:
                    commit("setCatalogLoadState", LoadState.Failed)
                    return
            }

            commit("setCategories", data.categories)
            commit("setProducts", data.products)
            commit("setCatalogLoadState", LoadState.Success)
        },
    },
}

export default store
