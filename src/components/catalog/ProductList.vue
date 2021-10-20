<template>
    <div class="auto-scroll">
        <base-button
            v-if="add"
            :bordered="true"
            :club="club"
            @clicked="emitAdd"
        >
            <div style="width: 100%">+</div>
        </base-button>
        <base-button
            v-for="product in products"
            :key="product.id"
            :club="club"
            class="flex-apart"
            @clicked="clickProduct(product)"
            :selected="selectedProductId == product.id"
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
    props: ["club", "categoryID", "add", "selectedProductId", "showAll"],
    setup(props, { emit }) {
        const store = useStore()

        const products = computed<Product[]>(() => {
            const allProducts: Product[] = store.getters.products
            if (!props.categoryID) {
                return allProducts
            }
            return allProducts.filter(
                (product) =>
                    product.category == props.categoryID &&
                    (props.showAll || productPrice(product, props.club) > 0)
            )
        })

        function clickProduct(product: Product) {
            emit("select-product", product)
        }

        function emitAdd() {
            emit("add")
        }

        return {
            products,

            renderPrice,
            productPrice,

            clickProduct,
            emitAdd,
        }
    },
})
</script>

<style></style>
