import { apiEndpoint } from "./settings"
import { Order } from "@/type/order"

export async function postOrder(order: Order) {
    return await fetch(apiEndpoint + `/order`, {
        method: "POST",
        body: JSON.stringify(order),
        credentials: "include",
    })
}
