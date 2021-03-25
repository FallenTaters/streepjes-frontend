import { createStore } from "vuex"
import createPersistedState from "vuex-persistedstate"

import orderStore from "./order"
import catalogStore from "./catalog"
import memberStore from "./members"
// import { Role } from "@/type/user"
// import { Order } from "@/type/order"

// interface MyStore {
//     order: Order
//     currentRole: string
//     lastActive: Date
// }

export default createStore({
    // state: {
    //     currentRole: Role.NotAuthorized,
    //     lastActive: new Date(),
    // },
    // getters: {
    //     role(state): string {
    //         return state.currentRole
    //     },
    // },
    // mutations: {
    //     setRole(state, role: string) {
    //         state.currentRole = role
    //     },
    //     setActive(state, date: Date) {
    //         state.lastActive = date
    //     },
    // },
    // actions: {
    //     setRole({ commit }, role: string) {
    //         commit("setRole", role)
    //     },
    //     refreshActive({ commit }) {
    //         commit("setActive", new Date())
    //     },
    // },
    modules: {
        order: orderStore,
        catalog: catalogStore,
        members: memberStore,
    },
    plugins: [createPersistedState()],
})
