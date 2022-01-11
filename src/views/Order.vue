<template>
    <the-header></the-header>
    <div class="container">
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
                    @clicked="removeProduct(orderline)"
                    :bordered="true"
                >
                    <div>
                        <b>x{{ orderline.amount }}</b>
                    </div>
                    <div>{{ orderline.product.name }}</div>
                    <div>
                        {{ renderPrice(orderlinePrice(orderline, club)) }}
                    </div>
                </base-button>
            </div>

            <club-select />
            <member-select />

            <div>
                <div class="flex-apart paymentTotal">
                    <h2>Total</h2>
                    <h2>{{ renderPrice(totalPrice) }}</h2>
                </div>
                <payment-buttons v-if="readyToPay" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from "vue"

import ClubSelect from "@/components/order/ClubSelect.vue"
import MemberSelect from "@/components/order/MemberSelect.vue"
import CategoryList from "@/components/catalog/CategoryList.vue"
import ProductList from "@/components/catalog/ProductList.vue"
import TheHeader from "@/components/TheHeader.vue"
import PaymentButtons from "@/components/order/PaymentButtons.vue"

import { Club } from "@/type/member"
import { LoadState } from "@/api/type"
import { renderPrice, Product } from "@/type/catalog"
import { orderlinePrice, Orderline } from "@/type/order"
import { useStore } from "@/store/index"

export default defineComponent({
    setup() {
        const store = useStore()
        // fetch stuff
        store.dispatch("fetchCatalog")
        store.dispatch("fetchMembers")
        store.dispatch("unselectMember")

        // map getters
        const catalogLoadState = computed<LoadState>(
            () => store.getters.catalogLoadState
        )
        const club = computed<Club>(() => store.getters.club)
        const orderlines = computed<Orderline[]>(() => store.getters.orderlines)
        const totalPrice = computed<number>(() => store.getters.totalPrice)

        // category selection
        const selectedCategoryID = ref<number>(0)

        watch(catalogLoadState, (v) => {
            if (v == LoadState.Success && store.getters.categories.length > 0) {
                selectedCategoryID.value = store.getters.categories[0].id
            }
        })

        // product selection
        function addProduct(product: Product) {
            store.dispatch("addProduct", product)
        }

        function removeProduct(orderline: Orderline) {
            store.dispatch("removeFromOrderline", orderline)
        }

        // payment
        const readyToPay = computed<boolean>(
            () => club.value != Club.Unknown && totalPrice.value > 0
        )

        return {
            LoadState,

            catalogLoadState,
            club,
            selectedCategoryID,
            orderlines,
            totalPrice,

            readyToPay,

            renderPrice,
            orderlinePrice,

            removeProduct,
            addProduct,
        }
    },
    components: {
        ClubSelect,
        CategoryList,
        ProductList,
        TheHeader,
        MemberSelect,
        PaymentButtons,
    },
})
</script>
