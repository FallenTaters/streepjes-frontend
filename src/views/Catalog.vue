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
        <h2></h2>
        <category-list :club="club" v-model="selectedCategoryID" :add="true" />
        <product-list
            @select-product="selectProduct"
            :club="club"
            :categoryID="selectedCategoryID"
            :add="true"
            :selectedProductId="selectedProductID"
        />
        <product-details :id="selectedProductID" />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from "vue"

import CategoryList from "@/components/catalog/CategoryList.vue"
import ProductList from "@/components/catalog/ProductList.vue"
import TheHeader from "@/components/TheHeader.vue"

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
        store.dispatch("fetchUserClub")

        // map getters
        const catalogLoadState = computed<LoadState>(
            () => store.getters.catalogLoadState
        )
        const club = computed<Club>(() => store.getters.userClub)

        // category & product selection
        const selectedCategoryID = ref<number>(0)
        const selectedProductID = ref<number>(0)

        watch(catalogLoadState, (v) => {
            if (v == LoadState.Success && store.getters.categories.length > 0) {
                selectedCategoryID.value = store.getters.categories[0].id
            }
        })

        function selectProduct(product: Product) {
            selectedProductID.value = product.id
        }

        return {
            LoadState,

            catalogLoadState,
            club,
            selectedCategoryID,
            selectedProductID,

            renderPrice,
            orderlinePrice,

            selectProduct,
        }
    },
    components: {
        CategoryList,
        ProductList,
        TheHeader,
    },
})
</script>

<style scoped>
.container {
    height: 94vh;
    justify-content: stretch;
    margin-left: auto;
    margin-right: auto;
    display: grid;
    grid-template-columns: 20% 35% 45%;
    grid-template-rows: 10% 65% 25%;
}

.paymentTotal {
    margin: 0 20px;
}
.paymentTotal > h2 {
    margin: 0px;
}
</style>
