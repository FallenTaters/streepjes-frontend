import { Club, Member } from "@/type/member"
import { Order, orderPrice, Orderline } from "@/type/order"
import { Product } from "@/type/catalog"
import { Module } from "vuex"

const emptyMember: Member = {
    id: 0,
    club: Club.Unknown,
    name: "",
    debt: 0,
}

const store: Module<Order, MyStore> = {
    state: {
        club: Club.Unknown,
        orderlines: [],
        member: {
            id: 0,
            club: Club.Unknown,
            name: "",
            debt: 0,
        },
    },
    getters: {
        club(state): Club {
            return state.club
        },
        orderlines(state): Orderline[] {
            return state.orderlines
        },
        member(state): Member {
            return state.member
        },
        totalPrice(state): number {
            return orderPrice(state)
        },
    },
    mutations: {
        setMember(state, member: Member) {
            state.member = member
        },
    },
    actions: {
        addProduct({ commit }, product: Product) {
            commit("addProduct", product)
        },
        setMember({ commit }, member: Member) {
            commit("setMember", member)
        },
        unsetMember({ commit }) {
            commit("setMember", emptyMember)
        },
    },
}

export default store
