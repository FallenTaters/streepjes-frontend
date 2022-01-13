<template>
    <the-header></the-header>
    <h1>Last Orders</h1>
    <h3 v-if="loadState == Loading">Loading...</h3>
    <div id="orders">
        <div v-for="order in shownOrders" :key="order.id">
            <base-button
                :club="order.club"
                @clicked="showOrderModal(order)"
                :disabled="order.status == OrderStatus.Cancelled"
                :margin="5"
                :padding="9"
            >
                <div class="flex-apart">
                    <div class="w-300 align-right ellipsis">
                        <template v-if="order.member">
                            {{ order.member.name }}
                        </template>
                    </div>
                    <div class="w-200 align-right">
                        {{ renderDate(order.orderDate) }}
                    </div>
                    <div class="w-100 align-right">
                        {{ renderPrice(order.price) }}
                    </div>
                </div>
            </base-button>
        </div>
    </div>
    <modal
        v-if="selectedOrder"
        closeText="← Back"
        @close="selectedOrder = null"
        :closeAbsolute="true"
    >
        <div>
            <div style="text-align: right">
                <button
                    v-if="selectedOrder.status != OrderStatus.Cancelled"
                    @click="doDeleteOrder"
                    class="badge-link"
                    style="background-color: darkred"
                >
                    Delete
                </button>
                <div v-else class="deleted">Deleted</div>
            </div>
            <h3>
                {{
                    selectedOrder.member
                        ? selectedOrder.member.name
                        : "anonymous"
                }}
            </h3>
            <div id="orderlines">
                <div
                    v-for="ol in selectedOrder.orderlines"
                    :key="ol.product.id"
                    class="flex-apart"
                >
                    <div>
                        <span style="margin-right: 30px; font-weight: bold">
                            {{ ol.amount }}x
                        </span>
                        <span>
                            {{ ol.product.name }}
                        </span>
                    </div>
                    <div>
                        {{
                            renderPrice(
                                productPrice(ol.product, selectedOrder.club) *
                                    ol.amount
                            )
                        }}
                    </div>
                </div>
            </div>
        </div>
    </modal>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"

import { useStore } from "@/store/index"
import { getOrders, deleteOrder } from "@/api/order"
import { LoadState } from "@/api/type"
import { renderPrice, productPrice } from "@/type/catalog"
import { Order, OrderStatus } from "@/type/order"
import { renderDate } from "@/type/time"

import TheHeader from "@/components/TheHeader.vue"
import BaseButton from "@/components/ui/BaseButton.vue"

export default defineComponent({
    setup() {
        const store = useStore()

        // fetch orders
        const selectedOrder = ref<null | Order>(null)
        let orders: Order[] = []
        const loadState = ref<LoadState>(LoadState.Loading)
        const shownOrders = ref<Order[]>([])

        async function processOrders() {
            loadState.value = LoadState.Failed
            orders = await getOrders(store.getters.members).catch(() => {
                store.dispatch("unauthorized")
                loadState.value = LoadState.Failed
                return []
            })

            orders.sort((o1, o2) => {
                if (!o1.orderDate) {
                    return +1
                } else if (!o2.orderDate) {
                    return -1
                }

                return o2.orderDate.getTime() - o1.orderDate.getTime()
            })
            loadState.value = LoadState.Success
            shownOrders.value = orders.slice(0, 10)
        }
        processOrders()

        // modal
        function showOrderModal(o: Order) {
            selectedOrder.value = o
        }

        const disableDeleteButton = ref<boolean>(false)

        async function doDeleteOrder() {
            disableDeleteButton.value = true
            if (!selectedOrder.value) {
                disableDeleteButton.value = false
                return
            }

            const orderId = selectedOrder.value.id ? selectedOrder.value.id : 0
            await deleteOrder(orderId)
                .then(() => {
                    if (!selectedOrder.value) {
                        return
                    }
                    selectedOrder.value.status = OrderStatus.Cancelled
                    selectedOrder.value = null
                })
                .catch(() => {
                    store.dispatch("unauthorized")
                })

            disableDeleteButton.value = false
        }

        return {
            OrderStatus,

            renderPrice,
            productPrice,
            renderDate,

            selectedOrder,
            shownOrders,
            loadState,
            Loading: LoadState.Loading,
            disableDeleteButton,

            showOrderModal,
            doDeleteOrder,
        }
    },
    components: { TheHeader, BaseButton },
})
</script>

<style scoped>
#orderlines {
    height: 250px;
    overflow: auto;
}
#orders {
    height: 500px;
    overflow: auto;
    font-size: 0.9em;
}
.deleted {
    color: darkred;
    font-weight: bold;
    padding: 10px;
}
</style>
