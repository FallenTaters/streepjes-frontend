<template>
    <div>
        <form @submit.prevent="saveProduct">
            <div class="form-row">
                <div class="form-col">
                    <label for="productName">Name</label>
                </div>
                <div class="form-col">
                    <input
                        id="productName"
                        v-model="productName"
                        class="form-input"
                    />
                </div>
            </div>

            <div class="form-row">
                <div class="form-col">
                    <label for="category">Category</label>
                </div>
                <div class="form-col">
                    <select
                        id="category"
                        v-model="categoryID"
                        class="form-input"
                    >
                        <option
                            v-for="category in categories"
                            :key="category.id"
                            :value="category.id"
                        >
                            {{ category.name }}
                        </option>
                    </select>
                </div>
            </div>

            <div class="form-row">
                <div class="form-col">
                    <label for="priceParabool">Price Parabool (¢)</label>
                </div>
                <div class="form-col">
                    <input
                        id="priceParabool"
                        v-model="priceParabool"
                        class="form-input"
                    />
                </div>
            </div>

            <div class="form-row">
                <div class="form-col">
                    <label for="priceGladiators">Price Gladiators (¢)</label>
                </div>
                <div class="form-col">
                    <input v-model="priceGladiators" class="form-input" />
                </div>
            </div>

            <div class="form-row">
                <div class="form-col">
                    <base-button
                        :club="userClub"
                        :margin="0"
                        @click="discardProduct"
                    >
                        {{ deleteText }}
                    </base-button>
                </div>
                <div class="form-col">
                    <base-button
                        :club="userClub"
                        :margin="0"
                        @click="saveProduct"
                    >
                        {{ saveText }}
                    </base-button>
                </div>
            </div>

            <div class="error">
                <span>{{ errorText }}</span>
            </div>
        </form>
    </div>
</template>

<script lang="ts">
import { defineComponent, watch, ref, computed } from "vue"

import { Category, Product } from "@/type/catalog"
import { useStore } from "@/store/index"
import BaseButton from "../ui/BaseButton.vue"
import { Club } from "@/type/member"
import { deleteProduct, postProduct } from "@/api/catalog"

export default defineComponent({
    props: ["id", "newProduct"],
    setup(props, { emit }) {
        const store = useStore()

        const categories = ref<Category[]>(store.getters.categories)
        const userClub = ref<Club>(store.getters.userClub)

        let productID = 0
        const productName = ref<string>("")
        const categoryID = ref<number>(0)
        const priceParabool = ref<number>(0)
        const priceGladiators = ref<number>(0)

        const errorText = ref<string>("")

        function clearForm() {
            productID = 0
            productName.value = ""
            categoryID.value = 0
            priceParabool.value = 0
            priceGladiators.value = 0
            errorText.value = ""
        }

        function loadProduct() {
            let product: Product = store.getters.products.find(
                (p: Product) => p.id == props.id
            )

            productID = product.id
            productName.value = product.name
            categoryID.value = product.category
            priceParabool.value = product.priceParabool
            priceGladiators.value = product.priceGladiators

            errorText.value = ""
        }

        if (!props.newProduct) {
            loadProduct()
        }
        watch(props, () => {
            if (!props.newProduct) loadProduct()
            else clearForm()
        })

        const saveText = computed(() =>
            props.newProduct ? "Add to catalog" : "Save changes"
        )
        const deleteText = computed(() =>
            props.newProduct ? "Discard" : "Delete"
        )

        async function discardProduct() {
            errorText.value = ""
            if (props.newProduct) {
                emit("deleted")
                return
            }

            try {
                await deleteProduct(props.id)
            } catch (e) {
                errorText.value = "Unable to delete product"
                return
            }

            emit("deleted")
        }

        async function saveProduct() {
            errorText.value = ""
            const product: Product = {
                id: props.newProduct ? 0 : productID,
                category: categoryID.value,
                name: productName.value,
                priceParabool: +priceParabool.value,
                priceGladiators: +priceGladiators.value,
            }

            try {
                const resp = await postProduct(product)
                if (resp.status === 200) {
                    emit("saved")
                    return
                }

                errorText.value = await resp.text()
            } catch (e) {
                errorText.value = "connection error"
            }
        }

        return {
            productName,
            categoryID,
            priceParabool,
            priceGladiators,

            categories,
            userClub,

            saveText,
            deleteText,
            errorText,

            discardProduct,
            saveProduct,
        }
    },
    components: { BaseButton },
})
</script>

<style scoped>
.form-row {
    display: flex;
    align-items: center;
}
.form-col {
    text-align: left;
    width: 50%;
    padding: 3px;
}
.form-input {
    width: stretch;
    padding: 12px;
    border-radius: 15px;
    border: 3px solid black;
    background-color: lightgray;
    font-size: 1.5rem;
}
</style>
