import { Module } from "vuex"
import { Category, Product } from "@/type/catalog"
import { getCatalog } from "@/api/catalog"
import { LoadState } from "@/api/type"

export interface CatalogState {
    loadState: LoadState
    categories: Category[]
    products: Product[]
}

export const catalogStore: Module<CatalogState, object> = {
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

            getCatalog()
                .then(catalog => {
                    commit("setCategories", catalog.categories)
                    commit("setProducts", catalog.products)
                    commit("setCatalogLoadState", LoadState.Success)
                })
                .catch(() => {
                    dispatch("unauthorized")
                    commit("setCatalogLoadState", LoadState.Failed)
                })
        },
    },
}
