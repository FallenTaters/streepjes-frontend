<template>
    <div class="container">
        <h2>Category</h2>
        <h2>Product</h2>
        <h2>Order</h2>
        <category-list v-model="selectedCategoryID" />
        <product-list
            @select-product="addProduct"
            :club="club"
            :categoryID="selectedCategoryID"
        />
        <div id="bill" class="auto-scroll">
            <base-button
                v-for="orderline in order.orderlines"
                :key="orderline.product.id"
                class="flex-apart"
                @click="removeProduct(orderline)"
                :bordered="true"
            >
                <div>
                    <b>x{{ orderline.amount }}</b>
                </div>
                <div>{{ orderline.product.name }}</div>
                <div>{{ orderline.price(club).print() }}</div>
            </base-button>
        </div>
        <club-select id="club-select" />
        <div />
        <div id="bill-summary">
            <div class="flex-apart" style="padding: 0 30px">
                <h2>Total</h2>
                <h2>{{ order.totalPrice(club).print() }}</h2>
            </div>
            <div class="flex-even" v-if="readyToPay">
                <base-button
                    class="square150"
                    style="line-height: 3rem"
                    @click="selectCustomer"
                >
                    <h2>Select Member</h2>
                </base-button>
                <base-button class="square150" style="line-height: 3rem">
                    <h2>Direct Payment</h2>
                </base-button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from "vue"
import { useStore } from "vuex"

import ClubSelect from "@/components/ClubSelect.vue"
import CategoryList from "@/components/catalog/CategoryList.vue"
import ProductList from "@/components/catalog/ProductList.vue"
import { Club } from "@/type/type"
import { getCatalog } from "@/api/catalog"

export default {
    components: { ClubSelect, CategoryList, ProductList },
    created() {
        const loadState = ref("loading")
        getCatalog()
            .then(() => {
                loadState.value = "ready"
                this.selectedCategoryID = this.$store.getters.categories[0].id
            })
            .catch(error => {
                console.error(error)
                loadState.value = "failed"
            })
        return { loadState }
    },
    data() {
        return {
            selectedCategoryID: 0,
        }
    },
    computed: {
        order() {
            return this.$store.getters.order
        },
        readyToPay() {
            return (
                this.$store.getters.club != Club.Unknown &&
                this.order.totalPrice().amount > 0
            )
        },
        club() {
            return this.$store.getters.club
        },
    },
    methods: {
        selectCategory(id) {
            this.selectedCategoryID = id
        },
        addProduct(product) {
            this.order.addProduct(product)
        },
        removeProduct(orderline) {
            if (orderline.amount <= 1) {
                this.order.orderlines = this.order.orderlines.filter(
                    line => line != orderline
                )
                return
            }
            orderline.amount -= 1
        },
        selectCustomer() {
            this.$router.push({ name: "select-member" })
        },
    },
}
</script>

<style scoped>
.container {
    height: 87vh;
    justify-content: stretch;
    margin-left: auto;
    margin-right: auto;
    display: grid;
    grid-template-columns: 20% 35% 45%;
    grid-template-rows: 10% 65% 25%;
}
</style>
