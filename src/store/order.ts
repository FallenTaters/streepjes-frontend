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

const emptyOrder: Order = {
    club: Club.Unknown,
    orderlines: [],
    member: emptyMember,
}

const store: Module<Order, object> = {
    state: emptyOrder,
    getters: {
        club(state): Club {
            return state.club
        },
        orderlines(state): Orderline[] {
            return state.orderlines
        },
        selectedMember(state): Member {
            return state.member
        },
        memberSelected(state): boolean {
            return state.member.id != 0
        },
        totalPrice(state): number {
            return orderPrice(state)
        },
    },
    mutations: {
        setMember(state, member: Member) {
            state.member = member
        },
        removeOrderline(state, orderline: Orderline) {
            state.orderlines = state.orderlines.filter(ol => ol != orderline)
        },
        setClub(state, club: Club) {
            state.club = club
        },
        addProduct(state, product: Product) {
            for (const ol of state.orderlines) {
                if (ol.product.id === product.id) {
                    ol.amount++
                    return
                }
            }
            state.orderlines.push({
                amount: 1,
                product: product,
            })
        },
        clearOrder(state) {
            Object.assign(state, emptyOrder)
        },
    },
    actions: {
        addProduct({ commit }, product: Product) {
            commit("addProduct", product)
        },
        removeFromOrderline({ commit }, ol: Orderline) {
            if (ol.amount > 1) {
                ol.amount--
                return
            }
            commit("removeOrderline", ol)
        },
        selectMember({ commit }, member: Member) {
            commit("setMember", member)
        },
        unselectMember({ commit }) {
            commit("setMember", emptyMember)
        },
        setClub({ commit }, club: Club) {
            commit("setClub", club)
        },
        clearOrder({ commit }) {
            commit("clearOrder")
        },
    },
}

export default store
