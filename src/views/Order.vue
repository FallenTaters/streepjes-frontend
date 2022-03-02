<template>
    <the-header></the-header>
    <h1 v-if="catalogLoadState == LoadState.Loading">Loading...</h1>
    <h1 v-if="catalogLoadState == LoadState.Failed">
        Failed to load.
        <a href="#" onclick="window.location.reload();">Refresh the page</a>
        or
        <router-link to="/login">log in again.</router-link>
    </h1>
    <div
        v-else
        class="container full-height-container"
        style="
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        "
    >
        <div class="row">
            <div class="col l4 m4 s12">
                <h2 class="l">Category</h2>
                <h4 class="s m">Category</h4>
                <category-list v-model="selectedCategoryID" />
            </div>
            <div class="col l4 m4 s12">
                <h2 class="l">Product</h2>
                <h4 class="s m">Product</h4>
                <product-list
                    @select-product="addProduct"
                    :club="club"
                    :categoryID="selectedCategoryID"
                />
            </div>
            <div class="col l4 m4 s12">
                <h2 class="l">Order</h2>
                <h4 class="s m">Order</h4>
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
            </div>
        </div>
        <div class="row">
            <div class="col l4 m4 s12">
                <club-select />
            </div>

            <div class="col l4 m4 s12">
                <member-select />
            </div>

            <div class="col l4 m4 s12">
                <div class="flex-apart paymentTotal">
                    <h4 class="l">Total {{ renderPrice(totalPrice) }}</h4>
                    <h4 class="m s">Total {{ renderPrice(totalPrice) }}</h4>
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
