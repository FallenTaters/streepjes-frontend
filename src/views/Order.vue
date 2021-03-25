<template>
    <the-header></the-header>
    <h1 v-if="loadState == 'loading'">Loading...</h1>
    <h1 v-if="loadState == 'failed'">
        Failed to load.
        <a href="#" onclick="window.location.reload();">Refresh the page</a>
        or
        <router-link to="/login">log in again.</router-link>
    </h1>
    <div class="container" v-if="loadState == 'ready'">
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
        <club-select />
        <member-select />
        <div id="bill-summary">
            <div class="flex-apart" style="padding: 0 30px">
                <h2>Total</h2>
                <h2>{{ order.totalPrice(club).print() }}</h2>
            </div>
            <div class="flex-even" v-if="readyToPay">
                <base-button
                    class="square150"
                    style="line-height: 3rem"
                    :disabled="!(selectedMember.id > 0)"
                >
                    <h2>Add to Bill</h2>
                </base-button>
                <base-button class="square150" style="line-height: 2.7rem">
                    <h2>Direct Payment</h2>
                </base-button>
            </div>
        </div>
    </div>
</template>

<script type="ts">
import { mapGetters } from "vuex"
import ClubSelect from "@/components/ClubSelect.vue"
import MemberSelect from "@/components/MemberSelect.vue"
import CategoryList from "@/components/catalog/CategoryList.vue"
import ProductList from "@/components/catalog/ProductList.vue"
import TheHeader from "@/components/ui/TheHeader.vue"
import { Club } from "@/type/type"
import { getCatalog } from "@/api/catalog"

export default {
    components: {
        ClubSelect,
        CategoryList,
        ProductList,
        TheHeader,
        MemberSelect,
    },
    created() {
        getCatalog()
            .then(() => {
                this.loadState = "ready"
                this.selectedCategoryID = this.$store.getters.categories[0].id
            })
            .catch(error => {
                console.error(error)
                this.loadState = "failed"
            })
    },
    data() {
        return {
            selectedCategoryID: 0,
            loadState: "loading",
        }
    },
    computed: {
        ...mapGetters(["order", "club", "selectedMember"]),
        readyToPay() {
            return (
                this.club != Club.Unknown &&
                this.order.totalPrice(this.club).amount > 0
            )
        },
    },
    watch: {
        loadState(value) {
            if (value == `failed`) {
                this.$router.push(`/login`)
            }
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
