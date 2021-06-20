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
        <category-list
            :club="club"
            v-model="selectedCategoryID"
            :add="true"
            @add="addCategory"
            @doubleClickCategory="editCategory"
        />
        <product-list
            @select-product="selectProduct"
            @add="addProduct"
            :club="club"
            :categoryID="selectedCategoryID"
            :add="true"
            :selectedProductId="selectedProductID"
            :showAll="true"
        />
        <product-form
            v-if="selectedProductID || newProduct"
            :id="selectedProductID"
            :newProduct="newProduct"
            @deleted="deletedProduct"
            @saved="savedProduct"
        />
        <modal
            v-if="editCategoryID || newCategory"
            closeText="← Back"
            @close="closeCategoryModal"
        >
            <category-form
                :id="editCategoryID"
                :newCategory="newCategory"
                @deleted="deletedCategory"
                @saved="savedCategory"
            />
        </modal>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from "vue"

import CategoryList from "@/components/catalog/CategoryList.vue"
import ProductList from "@/components/catalog/ProductList.vue"
import ProductForm from "@/components/catalog/ProductForm.vue"
import TheHeader from "@/components/TheHeader.vue"
import Modal from "@/components/ui/Modal.vue"
import CategoryForm from "@/components/catalog/CategoryForm.vue"

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

        // product management
        const newProduct = ref<boolean>(false)
        function addProduct() {
            newProduct.value = true
            selectedProductID.value = 0
        }
        function deletedProduct() {
            newProduct.value = false
            if (selectedProductID.value !== 0) {
                window.location.reload()
            }
        }
        function savedProduct() {
            window.location.reload()
        }

        // category management
        const newCategory = ref<boolean>(false)
        const editCategoryID = ref<number>(0)
        function addCategory() {
            newCategory.value = true
        }
        function editCategory(id: number) {
            newCategory.value = false
            editCategoryID.value = id
        }
        function deletedCategory() {
            if (!newCategory.value) window.location.reload()
            else newCategory.value = false
        }
        function savedCategory() {
            window.location.reload()
        }
        function closeCategoryModal() {
            newCategory.value = false
            editCategoryID.value = 0
        }

        return {
            LoadState,

            catalogLoadState,
            club,
            selectedCategoryID,
            selectedProductID,
            editCategoryID,

            renderPrice,

            addProduct,
            selectProduct,
            deletedProduct,
            savedProduct,
            deletedCategory,
            savedCategory,
            addCategory,
            editCategory,
            closeCategoryModal,

            newProduct,
            newCategory,
        }
    },
    components: {
        CategoryList,
        ProductList,
        TheHeader,
        ProductForm,
        Modal,
        CategoryForm,
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
