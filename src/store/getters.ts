import { GetterTree } from "vuex"

export getters: GetterTree<any, any> = {
    getCategories: state => {
        return state.categories
    },
}
