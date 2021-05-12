<template>
    <the-header></the-header>
    <h1 v-if="loadState == LoadState.Loading">Loading...</h1>
    <h1 v-if="loadState == LoadState.Failed">
        Failed to load.
        <a href="#" onclick="window.location.reload();">Refresh the page</a>
        or
        <router-link to="/login">log in again.</router-link>
    </h1>
    <div v-if="loadState == LoadState.Success">
        <!-- // filters ? -->
        <order-table :orders="orders" />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import TheHeader from "@/components/TheHeader.vue"
import OrderTable from "@/components/billing/OrderTable.vue"
import { getOrders } from "@/api/order"
import { useStore } from "@/store"
import { LoadState } from "@/api/type"
import { Order } from "@/type/order"
export default defineComponent({
    setup() {
        const store = useStore()
        store.dispatch("fetchMembers")
        const loadState = ref<LoadState>(store.getters.memberLoadState)

        const orders = ref<Order[]>([])

        async function fetchOrders() {
            const allOrders = await getOrders(store.getters.members).catch(
                () => {
                    loadState.value = LoadState.Failed
                    store.dispatch("unauthorized")
                }
            )
            if (!allOrders) {
                return
            }

            orders.value = allOrders
            orders.value.sort((o) => (o.orderDate ? -o.orderDate.getTime() : 0))
            loadState.value = LoadState.Success
        }
        fetchOrders()

        return {
            loadState,
            orders,
            LoadState,
        }
    },
    components: {
        TheHeader,
        OrderTable,
    },
})
</script>

<style scoped></style>
