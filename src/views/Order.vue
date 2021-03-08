<template>
    <div class="container">
        <h2>Category</h2>
        <h2>Product</h2>
        <h2>Order</h2>
        <category-list v-model="selectedCategoryID"> </category-list>
        <product-list
            :categoryID="selectedCategoryID"
            @select-product="addProduct"
        ></product-list>
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
                <div>{{ orderline.price().print() }}</div>
            </base-button>
        </div>
        <club-select id="club-select" />
        <div />
        <div id="bill-summary">
            <div class="flex-apart" style="padding: 0 30px">
                <h2>Total</h2>
                <h2>{{ order.totalPrice().print() }}</h2>
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
import ClubSelect from "@/components/ClubSelect.vue"
import CategoryList from "@/components/catalog/CategoryList.vue"
import ProductList from "@/components/catalog/ProductList.vue"
import { Club } from "@/type/type"
export default {
    components: { ClubSelect, CategoryList, ProductList },
    data() {
        return {
            selectedCategoryID: 0,
        }
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
    },
    mounted() {
        this.selectedCategoryID = this.$store.getters.categories[0].id
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
