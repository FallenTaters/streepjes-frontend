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
    member: Member
    orderlines: Orderline[]
    status: string
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
