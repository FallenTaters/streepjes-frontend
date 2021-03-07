<template>
    <div class="container">
        <h2>Category</h2>
        <h2>Product</h2>
        <h2>Order</h2>
        <h2 />
        <div>
            <base-button
                v-for="category in getCategories"
                :key="category.id"
                @click="selectCategory(category.id)"
            >
                {{ category.name }}
            </base-button>
        </div>
        <div>
            <base-button v-for="product in currentProducts" :key="product.id">
                {{ product.name }}
                {{ product.price }}
            </base-button>
        </div>
        <base-button />
        <base-button />
        <base-button />
        <base-button />
        <base-button />
        <base-button />
        <base-button />
        <base-button />
        <base-button />
    </div>
</template>

<script>
import { mapGetters } from "vuex"
import BaseButton from "@/components/ui/BaseButton.vue"
export default {
    components: { BaseButton },
    data() {
        return {
            selectedCategoryID: 0,
        }
    },
    methods: {
        selectCategory(id) {
            this.selectedCategoryID = id
        },
    },
    computed: {
        ...mapGetters(["getCategories"]),
        currentProducts() {
            console.log("filtered")
            return this.$store.getters.getProducts.filter(
                product => product.category == this.selectedCategoryID
            )
        },
    },
}
</script>

<style scoped>
.container {
    height: 80vh;
    justify-content: stretch;
    margin-left: auto;
    margin-right: auto;
    display: grid;
    grid-template-columns: 20% 35% 35% 10%;
    grid-template-rows: 10% 70% 20%;
}
</style>
