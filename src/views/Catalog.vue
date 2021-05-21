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
            @add="addProduct"
            :club="club"
            :categoryID="selectedCategoryID"
            :add="true"
            :selectedProductId="selectedProductID"
        />
        <product-form
            v-if="selectedProductID || newProduct"
            :id="selectedProductID"
            :newProduct="newProduct"
            @discard="discardProduct"
            @saved="savedProduct"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from "vue"

import CategoryList from "@/components/catalog/CategoryList.vue"
import ProductList from "@/components/catalog/ProductList.vue"
import ProductForm from "@/components/catalog/ProductForm.vue"
import TheHeader from "@/components/TheHeader.vue"

import { Club } from "@/type/member"
import { LoadState } from "@/api/type"
import { renderPrice, Product } from "@/type/catalog"
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
            newProduct.value = false
        }

        const newProduct = ref<boolean>(false)
        function addProduct() {
            newProduct.value = true
            selectedProductID.value = 0
        }
        function discardProduct() {
            newProduct.value = false
        }
        function savedProduct() {
            window.location.reload()
        }

        return {
            LoadState,

            catalogLoadState,
            club,
            selectedCategoryID,
            selectedProductID,

            renderPrice,

            addProduct,
            selectProduct,
            discardProduct,
            savedProduct,

            newProduct,
        }
    },
    components: {
        CategoryList,
        ProductList,
        TheHeader,
        ProductForm,
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
</style>
