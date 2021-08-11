import { apiEndpoint } from "./settings"
import { Member } from "@/type/member"
import {
    Order,
    OrderPayload,
    orderPrice,
    orderPayloadToOrder,
} from "@/type/order"
import { doFetch } from "./type"

export async function postOrder(order: Order): Promise<Response> {
    return await fetch(apiEndpoint + `/order`, {
        method: "POST",
        body: JSON.stringify({
            club: order.club,
            memberId: order.member ? order.member.id : null,
            contents: JSON.stringify(order.orderlines),
            price: orderPrice(order),
            status: order.status,
        }),
        credentials: "include",
    })
}

export async function getOrders(members: Member[]): Promise<Order[]> {
    return doFetch<OrderPayload[]>(apiEndpoint + "/orders").then((payload) => {
        const orders: Order[] = []
        payload.forEach((p) => {
            orders.push(orderPayloadToOrder(p, members))
        })
        return orders
    })
}

export async function getOrdersByMonth(
    year: string,
    month: string,
    members: Member[]
): Promise<Order[]> {
    return doFetch<OrderPayload[]>(
        apiEndpoint + "/orders/" + year + "/" + month
    ).then((payload) => {
        const orders: Order[] = []
        payload.forEach((p) => {
            orders.push(orderPayloadToOrder(p, members))
        })
        return orders
    })
}

export async function deleteOrder(id: number): Promise<Response> {
    return await fetch(apiEndpoint + `/order/delete/` + id, {
        method: "POST",
        credentials: "include",
    })
}
