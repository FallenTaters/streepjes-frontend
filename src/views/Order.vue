<template>
    <div class="container">
        <h2>Category</h2>
        <h2>Product</h2>
        <h2>Order</h2>
        <div id="categories">
            <base-button
                v-for="category in categories"
                :selected="category.id == selectedCategoryID"
                :key="category.id"
                @click="selectCategory(category.id)"
            >
                {{ category.name }}
            </base-button>
        </div>
        <div id="products">
            <base-button
                v-for="product in currentProducts"
                :key="product.id"
                class="flex-apart"
                @click="addProduct(product)"
            >
                <div>{{ product.name }}</div>
                <div>{{ product.price.print() }}</div>
            </base-button>
        </div>
        <div id="bill">
            <base-button
                v-for="orderline in order.orderlines"
                :key="orderline"
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
                <h3>Total</h3>
                <h3>{{ order.totalPrice().print() }}</h3>
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
import { mapGetters } from "vuex"
import ClubSelect from "@/components/ClubSelect.vue"
import { Club } from "@/type/type"
export default {
    components: { ClubSelect },
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
                this.order.orderlines.pop(orderline)
                return
            }
            orderline.amount -= 1
        },
        selectCustomer() {
            this.$router.push({ name: "select-member" })
        },
    },
    computed: {
        ...mapGetters(["categories"]),
        currentProducts() {
            return this.$store.getters.products.filter(
                product => product.category == this.selectedCategoryID
            )
        },
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
