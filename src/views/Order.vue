<template>
    <the-header></the-header>
    <h1 v-if="catalogLoadState == LoadState.Loading">Loading...</h1>
    <h1 v-if="catalogLoadState == LoadState.Failed">
        Failed to load.
        <a href="#" onclick="window.location.reload();">Refresh the page</a>
        or
        <router-link to="/login">log in again.</router-link>
    </h1>
    <div class="container" v-if="catalogLoadState == LoadState.Success">
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
                v-for="orderline in orderlines"
                :key="orderline.product.id"
                class="flex-apart"
                @click="removeProduct(orderline)"
                :bordered="true"
            >
                <div>
                    <b>x{{ orderline.amount }}</b>
                </div>
                <div>{{ orderline.product.name }}</div>
                <div>{{ olPrice(orderline) }}</div>
            </base-button>
        </div>
        <club-select />
        <member-select />
        <div id="bill-summary">
            <div class="flex-apart" style="padding: 0 30px">
                <h2>Total</h2>
                <h2>{{ renderPrice(totalPrice) }}</h2>
            </div>
            <payment-buttons v-if="readyToPay" />
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex"
import ClubSelect from "@/components/order/ClubSelect.vue"
import MemberSelect from "@/components/order/MemberSelect.vue"
import CategoryList from "@/components/catalog/CategoryList.vue"
import ProductList from "@/components/catalog/ProductList.vue"
import TheHeader from "@/components/TheHeader.vue"
import { Club } from "@/type/member"
import { LoadState } from "@/api/type"
import { defineComponent } from "vue"
import { renderPrice } from "@/type/catalog"
import { orderlinePrice } from "@/type/order"
import PaymentButtons from "@/components/order/PaymentButtons.vue"

export default defineComponent({
    components: {
        ClubSelect,
        CategoryList,
        ProductList,
        TheHeader,
        MemberSelect,
        PaymentButtons,
    },
    created() {
        this.$store.dispatch("fetchCatalog")
        this.$store.dispatch("fetchMembers")
        this.$store.dispatch("unselectMember")
    },
    data() {
        return {
            selectedCategoryID: 0,
            LoadState,
        }
    },
    computed: {
        ...mapGetters([
            "orderlines",
            "club",
            "selectedMember",
            "totalPrice",
            "catalogLoadState",
        ]),
        readyToPay() {
            return this.club != Club.Unknown && this.totalPrice > 0
        },
    },
    watch: {
        catalogLoadState(v) {
            if (
                v == LoadState.Success &&
                this.$store.getters.categories.length > 0
            ) {
                this.selectedCategoryID = this.$store.getters.categories[0].id
            }
        },
    },
    methods: {
        renderPrice,
        selectCategory(id) {
            this.selectedCategoryID = id
        },
        addProduct(product) {
            this.$store.dispatch("addProduct", product)
        },
        removeProduct(orderline) {
            this.$store.dispatch("removeFromOrderline", orderline)
        },
        olPrice(ol) {
            return renderPrice(orderlinePrice(ol, this.club))
        },
    },
})
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
