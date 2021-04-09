import { Member } from "@/type/member"
import { Module } from "vuex"
import { getMembers } from "@/api/members"
import { LoadState } from "@/api/type"

export interface MemberState {
    members: Member[]
    loadState: LoadState
}

export const memberStore: Module<MemberState, unknown> = {
    state: {
        members: [],
        loadState: LoadState.NotLoaded,
    },
    getters: {
        byClub(state, getters) {
            return state.members.filter((mem) => mem.club == getters.club)
        },
        members(state) {
            return state.members
        },
        memberLoadState(state) {
            return state.loadState
        },
    },
    mutations: {
        setMembers(state, members: Member[]) {
            state.members = members
        },
        setMemberLoadState(state, newState: LoadState) {
            state.loadState = newState
        },
    },
    actions: {
        async fetchMembers({ commit, dispatch }) {
            commit("setCatalogLoadState", LoadState.Loading)

            let resp
            try {
                resp = await getMembers()
            } catch {
                commit("setMemberLoadState", LoadState.Failed)
                return
            }

            let data
            switch (resp.status) {
                case 200:
                    data = await resp.json()
                    break

                case 401:
                    dispatch("unauthorized")
                    commit("setMemberLoadState", LoadState.Failed)
                    return

                default:
                    commit("setMemberLoadState", LoadState.Failed)
                    return
            }

            commit("setMembers", data)
            commit("setMemberLoadState", LoadState.Success)
        },
    },
}
