import { Module } from "vuex"
import { Role, User } from "@/type/user"
import { State } from "."
import { Club } from "@/type/member"
import { getClub, getMe } from "@/api/auth"
import { getUsers } from "@/api/users"

export interface UserState {
    currentRole: string
    lastActive: Date
    club: Club
    users: User[]
    me: User | null
}

export const userStore: Module<UserState, State> = {
    state: {
        currentRole: Role.NotAuthorized,
        lastActive: new Date(),
        club: Club.Unknown,
        users: [],
        me: null,
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
        me(state): User | null {
            return state.me
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
        setMe(state, me: User) {
            state.me = me
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
                .then((me) => commit("setMe", me))
                .catch(() => dispatch("unauthorized"))
        },
        async fetchUserClub({ commit, dispatch }) {
            getClub()
                .then((club) => commit("setUserClub", club))
                .catch(() => dispatch("unauthorized"))
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
