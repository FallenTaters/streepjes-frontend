<template>
    <the-header></the-header>
    <h1>Last Orders</h1>
    <h3 v-if="loadState == 'Loading'">Loading...</h3>
    <div id="orders">
        <div v-for="order in shownOrders" :key="order.id">
            <base-button
                :club="order.club"
                @click="showOrderModal(order)"
                :disabled="order.status == OrderStatus.Cancelled"
                :margin="5"
                :padding="9"
            >
                <div class="flex-apart">
                    <div class="w-100">
                        <span v-if="order.member">
                            {{ order.member.name }}
                        </span>
                    </div>
                    <div>
                        {{ renderDate(order.orderDate) }}
                    </div>
                    <div class="w-200">
                        {{ renderPrice(order.price) }}
                    </div>
                </div>
            </base-button>
        </div>
    </div>
    <modal v-if="selectedOrder">
        <div>
            <div class="flex-apart">
                <button @click="selectedOrder = null" class="badge-link">
                    ← Back
                </button>
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
import { defineComponent, ref, computed } from "vue"

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
        const orders = ref<Order[]>([])
        const loadState = ref<LoadState>(LoadState.Loading)
        const shownOrders = computed<Order[]>(() => orders.value.slice(0, 10))

        async function processOrders() {
            loadState.value = LoadState.Failed
            orders.value = await getOrders(store.getters.members).catch(() => {
                store.dispatch("unauthorized")
                loadState.value = LoadState.Failed
                return []
            })
            orders.value.sort((o) => (o.orderDate ? -o.orderDate.getTime() : 0))
            loadState.value = LoadState.Success
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
