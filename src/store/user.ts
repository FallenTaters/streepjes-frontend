import { Module } from "vuex"
import { Role, User } from "@/type/user"
import { State } from "."
import { Club } from "@/type/member"
import { getMe } from "@/api/auth"
import { getUsers } from "@/api/users"

export interface UserState {
    currentRole: string
    lastActive: Date
    username: string
    club: Club
    users: User[]
}

export const userStore: Module<UserState, State> = {
    state: {
        currentRole: Role.NotAuthorized,
        lastActive: new Date(),
        username: "",
        club: Club.Unknown,
        users: [],
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
        users(state): User[] {
            return state.users
        },
        user(state): (username: string) => User | undefined {
            return (username: string) => {
                return state.users.find((u: User) => u.username === username)
            }
        },
        username(state): string {
            return state.username
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
        setUsers(state, users: User[]) {
            state.users = users
        },
        setUsername(state, username: string) {
            state.username = username
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
        async fetchMe({ commit, dispatch }) {
            getMe()
                .then((user) => {
                    commit("setUserClub", user.club)
                    commit("setUsername", user.username)
                })
                .catch(() => {
                    dispatch("unauthorized")
                })
        },
        async fetchUsers({ commit, dispatch }) {
            let resp
            try {
                resp = await getUsers()
            } catch {
                return
            }

            let data
            switch (resp.status) {
                case 200:
                    data = await resp.json()
                    break

                case 401:
                    dispatch("unauthorized")
                    return

                default:
                    return
            }

            commit("setUsers", data)
        },
    },
}
