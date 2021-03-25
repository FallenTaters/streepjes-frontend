import { Club, Member } from "@/type/member"
import { StoreOptions } from "vuex"

const store: StoreOptions<Member[]> = {
    state: [],
    getters: {
        byClub(state, club: Club) {
            return state.filter(mem => mem.club == club)
        },
    },
}

export default store
