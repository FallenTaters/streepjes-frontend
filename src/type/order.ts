import { Product, productPrice } from "./catalog"
import { Club, Member } from "./member"

export interface Orderline {
    product: Product
    amount: number
}

export function orderlinePrice(ol: Orderline, c: Club): number {
    return ol.amount * productPrice(ol.product, c)
}

export interface Order {
    club: Club
    orderlines: Orderline[]
    member: Member | null

    id: number | undefined
    bartender: string | undefined
    orderDate: Date | undefined
    status: string | undefined
    statusDate: Date | undefined
    price: number | undefined
}

export interface OrderPayload {
    id: number
    club: Club
    bartender: string
    memberId: number
    contents: string
    price: number
    orderDate: string
    status: string
    statusDate: string
}

export function orderPayloadToOrder(
    payload: OrderPayload,
    members: Member[]
): Order {
    const foundMember = members.find(m => (m.id = payload.memberId))
    const member = foundMember ? foundMember : null

    return {
        id: payload.id,
        club: payload.club,
        bartender: payload.bartender,
        member: member,
        orderlines: JSON.parse(payload.contents),
        orderDate: new Date(payload.orderDate),
        status: payload.status,
        statusDate: new Date(payload.statusDate),
        price: payload.price,
    }
}

export function orderPrice(o: Order): number {
    let sum = 0
    o.orderlines.forEach(ol => (sum += orderlinePrice(ol, o.club)))
    return sum
}

export function addProductToOrder(o: Order, p: Product) {
    o.orderlines.forEach(ol => {
        if (ol.product.id == p.id) {
            ol.amount++
            return
        }
    })

    o.orderlines.push({
        product: p,
        amount: 1,
    })
}

export const OrderStatus = {
    Open: "Open",
    Billed: "Billed",
    Paid: "Paid",
    Cancelled: "Cancelled",
}
