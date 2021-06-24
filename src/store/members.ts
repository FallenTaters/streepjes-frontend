import { Club, Member } from "@/type/member"
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
        membersByUserClub(state, getters): Member[] {
            return getters.membersByClub(getters.userClub)
        },
        membersByOrderClub(state, getters): Member[] {
            return getters.membersByClub(getters.club)
        },
        membersByClub(state): (club: Club) => Member[] {
            return (club: Club) =>
                state.members.filter((mem) => mem.club === club)
        },
        members(state): Member[] {
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
