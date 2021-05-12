<template>
    <div class="overflower">
        <table class="order-table">
            <tr>
                <th>Ordered</th>
                <th>Member</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Changed</th>
            </tr>

            <tr
                v-for="order in orders"
                :key="order.id"
                :class="orderClass[order.status]"
            >
                <td class="right">{{ renderDate(order.orderDate) }}</td>
                <td class="left">
                    {{ order.member ? order.member.name : "" }}
                </td>
                <td class="right">{{ renderPrice(order.price) }}</td>
                <td class="left">{{ order.status }}</td>
                <td class="right">{{ renderDate(order.statusDate) }}</td>
            </tr>
        </table>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { renderDate } from "@/type/time"
import { renderPrice } from "@/type/catalog"
import { OrderStatus } from "@/type/order"

export default defineComponent({
    props: {
        orders: {
            type: Object,
            required: true,
        },
    },
    setup() {
        const orderClass: Record<string, string> = {}
        orderClass[OrderStatus.Open] = "open"
        orderClass[OrderStatus.Cancelled] = "cancelled"
        orderClass[OrderStatus.Paid] = "paid"

        return {
            renderDate,
            renderPrice,
            orderClass,
        }
    },
})
</script>

<style scoped>
.overflower {
    height: 80vh;
    overflow: auto;
}
.order-table {
    margin: 20px auto;
    font-size: 0.6em;
    border-spacing: 0px;
    border: 1px solid black;
}
.order-table td {
    padding: 1px 20px;
}
th {
    border-bottom: 3px solid black;
}
.right {
    text-align: right;
}
.left {
    text-align: left;
}

.open {
    background-color: white;
}
.cancelled {
    background-color: rgb(180, 180, 180);
}
.paid {
    background-color: rgb(200, 233, 200);
}
</style>
