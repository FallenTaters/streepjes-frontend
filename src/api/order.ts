import { apiEndpoint } from "./settings"
import { Order, orderPrice } from "@/type/order"

export async function postOrder(order: Order) {
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
