<template>
    <the-header></the-header>
    <h1>Recent Order History</h1>
    <h3 v-if="loadState == 'Loading'">Loading...</h3>
    <div v-for="order in shownOrders" :key="order.id">
        <base-button :club="order.club" @click="showOrderModal(order)">
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
    <modal v-if="selectedOrder">
        <div>
            <div class="flex-apart">
                <button @click="selectedOrder = null" class="badge-link">
                    ← Back
                </button>
                <button
                    @click="deleteOrder"
                    class="badge-link"
                    style="background-color:darkred"
                >
                    Delete
                </button>
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
                        <span style="margin-right:30px; font-weight: bold;">
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

<script>
import TheHeader from "@/components/TheHeader.vue"
import { getOrders, deleteOrder } from "@/api/order"
import { LoadState } from "@/api/type"
import BaseButton from "@/components/ui/BaseButton.vue"
import { mapGetters } from "vuex"
import { renderPrice, productPrice } from "@/type/catalog"
import { renderDate } from "@/type/order"

export default {
    components: { TheHeader, BaseButton },
    data() {
        return {
            orders: [],
            loadState: LoadState.Loading,
            selectedOrder: null,
        }
    },
    computed: {
        ...mapGetters(["members"]),
        shownOrders() {
            return this.orders.slice(0, 10)
        },
    },
    methods: {
        processOrders() {
            this.orders.forEach(o => {
                if (typeof o.orderDate == "string") {
                    o.orderDate = new Date(o.orderDate)
                }

                if (typeof o.member == "undefined") {
                    o.member = this.members.find(m => m.id == o.memberId)
                }
            })

            this.orders.sort((a, b) => b.orderDate - a.orderDate)
        },
        renderPrice(p) {
            return renderPrice(p)
        },
        renderDate(d) {
            return renderDate(d)
        },
        productPrice(p, c) {
            return productPrice(p, c)
        },
        showOrderModal(o) {
            this.selectedOrder = o
            this.selectedOrder.orderlines = JSON.parse(
                this.selectedOrder.contents
            )
        },
        async deleteOrder() {
            this.disableDeleteButton = true
            if (!this.selectedOrder) {
                this.disableDeleteButton = false
                return
            }

            let resp
            try {
                resp = await deleteOrder(this.selectedOrder.id)
            } catch {
                this.disableDeleteButton = false
                return
            }

            if (resp.status == 200) {
                this.orders = this.orders.filter(o => o != this.selectedOrder)
                this.selectedOrder = null
            }

            this.disableDeleteButton = false
            return
        },
    },
    async created() {
        let resp
        try {
            resp = await getOrders()
        } catch {
            this.loadState = LoadState.Failed
        }

        let data
        switch (resp.status) {
            case 200:
                data = await resp.json()
                break

            case 401:
                this.$store.dispatch("unauthorized")
                return

            default:
                this.loadState = LoadState.Failed
                return
        }

        this.orders = data
        this.processOrders()
    },
}
</script>

<style scoped>
#orderlines {
    height: 250px;
    overflow: auto;
}
</style>

TheHeader
