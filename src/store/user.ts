import { Module } from "vuex"
import { Role } from "@/type/user"
import { State } from "."
import { Club } from "@/type/member"
import { getClub } from "@/api/auth"

export interface UserState {
    currentRole: string
    lastActive: Date
    club: Club
}

export const userStore: Module<UserState, State> = {
    state: {
        currentRole: Role.NotAuthorized,
        lastActive: new Date(),
        club: Club.Unknown,
    },
    getters: {
        userClub(state): Club {
            return state.club
        },
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
        setUserClub(state, club: Club) {
            state.club = club
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
        async fetchUserClub({ commit, dispatch }) {
            getClub()
                .then((club) => {
                    commit("setUserClub", club)
                })
                .catch(() => {
                    dispatch("unauthorized")
                })
        },
    },
}
