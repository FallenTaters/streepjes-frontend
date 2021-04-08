<template>
    <div class="auto-scroll">
        <base-button
            v-for="product in products"
            :key="product.id"
            class="flex-apart"
            @click="clickProduct(product)"
        >
            <div>{{ product.name }}</div>
            <div>{{ renderPrice(productPrice(product, club)) }}</div>
        </base-button>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue"
import { useStore } from "@/store/index"
import { productPrice, renderPrice, Product } from "@/type/catalog"

export default defineComponent({
    props: ["club", "categoryID"],
    setup(props, { emit }) {
        const store = useStore()

        const products = computed<Product[]>(() => {
            const allProducts: Product[] = store.getters.products
            if (!props.categoryID) {
                return allProducts
            }
            return allProducts.filter(
                (product) => product.category == props.categoryID
            )
        })

        function clickProduct(product: Product) {
            emit("select-product", product)
        }

        return {
            products,

            renderPrice,
            productPrice,

            clickProduct,
        }
    },
})
</script>

<style></style>
