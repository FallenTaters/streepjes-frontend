import { Module } from "vuex"
import { Role } from "@/type/user"

export interface UserState {
    currentRole: string
    lastActive: Date
}

export const userStore: Module<UserState, object> = {
    state: {
        currentRole: Role.NotAuthorized,
        lastActive: new Date(),
    },
    getters: {
        role(state): string {
            return state.currentRole
        },
        loggedIn(state): boolean {
            return state.currentRole != Role.NotAuthorized
        },
        lastActive(state): Date {
            return state.lastActive
        },
    },
    mutations: {
        setRole(state, role: string) {
            state.currentRole = role
        },
        setActive(state, date: Date) {
            state.lastActive = date
        },
    },
    actions: {
        setRole({ commit }, role: string) {
            commit("setRole", role)
        },
        refreshActive({ commit }) {
            commit("setActive", new Date())
        },
        unauthorized({ dispatch }) {
            dispatch("setRole", Role.NotAuthorized)
        },
    },
}
