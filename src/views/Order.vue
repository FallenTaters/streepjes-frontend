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

<script>
import { mapGetters } from "vuex"
import ClubSelect from "@/components/ClubSelect.vue"
import MemberSelect from "@/components/MemberSelect.vue"
import CategoryList from "@/components/catalog/CategoryList.vue"
import ProductList from "@/components/catalog/ProductList.vue"
import TheHeader from "@/components/ui/TheHeader.vue"
import { Club } from "@/type/member"
import { LoadState } from "@/api/type"
import { defineComponent } from "vue"
import { renderPrice } from "@/type/catalog"
import { orderlinePrice } from "@/type/order"

export default defineComponent({
    components: {
        ClubSelect,
        CategoryList,
        ProductList,
        TheHeader,
        MemberSelect,
    },
    created() {
        this.$store.dispatch("fetchCatalog")
        this.$store.dispatch("fetchMembers")
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
            if (v == LoadState.Success) {
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
