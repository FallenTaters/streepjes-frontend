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
        <div class="w-400" id="dateform">
            <form @submit.prevent="load">
                <div class="form-row">
                    <div class="form-col">
                        <input
                            id="month"
                            name="month"
                            type="month"
                            v-model="month"
                        />
                    </div>
                    <div class="form-col">
                        <base-button :club="userClub" margin="0" @click="load">
                            Load
                        </base-button>
                    </div>
                </div>
                <div class="form-row-center">
                    <base-button @click="getCSV" :club="userClub">
                        Download CSV
                    </base-button>
                </div>
            </form>
        </div>
        <order-table :orders="orders" />
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue"
import TheHeader from "@/components/TheHeader.vue"
import OrderTable from "@/components/billing/OrderTable.vue"
import { getOrdersByMonth } from "@/api/order"
import { useStore } from "@/store"
import { LoadState } from "@/api/type"
import { Order } from "@/type/order"
import { Club } from "@/type/member"
import { apiEndpoint } from "@/api/settings"

function formatAsMonth(date: Date): string {
    const month = date.getMonth() + 1
    const monthString = month > 9 ? month : "0" + month
    return date.getFullYear() + "-" + monthString
}

export default defineComponent({
    setup() {
        const store = useStore()
        const loadState = ref<LoadState>(store.getters.memberLoadState)
        const userClub = computed<Club>(() => store.getters.userClub)

        const orders = ref<Order[]>([])
        const month = ref<string>(formatAsMonth(new Date()))

        store.dispatch("fetchUserClub")

        async function load() {
            await store.dispatch("fetchMembers")
            const yearString = month.value.substring(0, 4)
            const monthString = month.value.substring(5, 7)

            const allOrders = await getOrdersByMonth(
                yearString,
                monthString,
                store.getters.members
            ).catch(() => {
                loadState.value = LoadState.Failed
                store.dispatch("unauthorized")
            })

            if (!allOrders) return

            orders.value = allOrders
            orders.value.sort((o) => (o.orderDate ? -o.orderDate.getTime() : 0))
            loadState.value = LoadState.Success
        }
        load()

        function getCSV() {
            const yearString = month.value.substring(0, 4)
            const monthString = month.value.substring(5, 7)
            window.open(
                apiEndpoint +
                    "/orders/" +
                    yearString +
                    "/" +
                    monthString +
                    "/csv"
            )
        }

        return {
            load,
            loadState,
            orders,
            LoadState,
            month,
            userClub,
            getCSV,
        }
    },
    components: {
        TheHeader,
        OrderTable,
    },
})
</script>

<style scoped>
#dateform {
    margin: 20px auto;
}

#month {
    width: stretch;
    padding: 12px;
    border-radius: 15px;
    border: 3px solid black;
    background-color: lightgray;
    font-size: 1.1rem;
}
</style>
