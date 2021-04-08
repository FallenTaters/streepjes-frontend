<template>
    <div class="auto-scroll">
        <base-button
            v-for="category in categories"
            :selected="category.id == modelValue"
            :key="category.id"
            @click="selectCategory(category.id)"
        >
            {{ category.name }}
        </base-button>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue"
import { useStore } from "@/store/index"
import { Category } from "@/type/catalog"

export default defineComponent({
    props: ["modelValue"],
    setup(_, { emit }) {
        const store = useStore()

        const categories = computed<Category[]>(() => store.getters.categories)

        function selectCategory(id: number) {
            emit("update:modelValue", id)
        }

        return {
            categories,
            selectCategory,
        }
    },
})
</script>

<style></style>
