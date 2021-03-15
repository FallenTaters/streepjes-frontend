<template>
    <div class="auto-scroll">
        <base-button
            v-for="product in products"
            :key="product.id"
            class="flex-apart"
            @click="clickProduct(product)"
        >
            <div>{{ product.name }}</div>
            <div>{{ product.getPrice(club).print() }}</div>
        </base-button>
    </div>
</template>

<script>
export default {
    props: ["categoryID", "club"],
    methods: {
        clickProduct(product) {
            this.$emit(`select-product`, product)
        },
    },
    computed: {
        products() {
            const allProducts = this.$store.getters.products
            if (!this.categoryID) {
                return allProducts
            }
            return allProducts.filter(
                product => product.category == this.categoryID
            )
        },
    },
}
</script>

<style></style>
