<template>
    <div class="auto-scroll">
        <base-button v-if="add" :bordered="true" :club="club" @click="emitAdd">
            <div style="width: 100%">+</div>
        </base-button>
        <base-button
            v-for="category in categories"
            :selected="category.id == modelValue"
            :key="category.id"
            :club="buttonClub"
            @click="selectCategory(category.id)"
            @dblclick="doubleClickCategory(category.id)"
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
    props: ["modelValue", "club", "add"],
    setup(props, { emit }) {
        const store = useStore()

        const categories = computed<Category[]>(() => store.getters.categories)

        const buttonClub = computed<string>(() => {
            return props.club ? props.club : store.getters.club
        })

        function selectCategory(id: number) {
            emit("update:modelValue", id)
        }

        function doubleClickCategory(id: number) {
            emit("doubleClickCategory", id)
        }

        function emitAdd() {
            emit("add")
        }

        return {
            categories,
            selectCategory,
            buttonClub,
            emitAdd,
            doubleClickCategory,
        }
    },
})
</script>

<style></style>
