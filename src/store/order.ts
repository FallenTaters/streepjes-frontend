import { Club, Member } from "@/type/member"
import { Order, orderPrice, Orderline } from "@/type/order"
import { Product } from "@/type/catalog"
import { Module } from "vuex"

function emptyOrder(): Order {
    return {
        id: undefined,
        club: Club.Unknown,
        orderlines: [],
        member: null,
        status: "",
        bartender: undefined,
        orderDate: undefined,
        statusDate: undefined,
        price: undefined,
    }
}

export interface OrderState {
    order: Order
}

export const orderStore: Module<OrderState, object> = {
    state: { order: emptyOrder() },
    getters: {
        club(state): Club {
            return state.order.club
        },
        orderlines(state): Orderline[] {
            return state.order.orderlines
        },
        selectedMember(state): Member | null {
            return state.order.member
        },
        memberSelected(state): boolean {
            return !!state.order.member
        },
        totalPrice(state): number {
            return orderPrice(state.order)
        },
        order(state): Order {
            return state.order
        },
    },
    mutations: {
        setMember(state, member: Member) {
            state.order.member = member
        },
        removeOrderline(state, orderline: Orderline) {
            state.order.orderlines = state.order.orderlines.filter(
                ol => ol != orderline
            )
        },
        setClub(state, club: Club) {
            state.order.club = club
        },
        addProduct(state, product: Product) {
            for (const ol of state.order.orderlines) {
                if (ol.product.id === product.id) {
                    ol.amount++
                    return
                }
            }
            state.order.orderlines.push({
                amount: 1,
                product: product,
            })
        },
        clearOrder(state) {
            state.order.orderlines = []
            state.order.member = null
            state.order.status = ""
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
            commit("setMember", undefined)
        },
        setClub({ commit }, club: Club) {
            commit("setClub", club)
        },
        clearOrder({ commit }) {
            commit("clearOrder")
        },
    },
}
