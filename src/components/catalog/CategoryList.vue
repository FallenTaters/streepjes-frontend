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

<script>
import { mapGetters } from "vuex"

export default {
    props: ["modelValue"], // value is categoryID
    computed: {
        ...mapGetters(["categories"]),
    },
    methods: {
        selectCategory(id) {
            this.$emit("update:modelValue", id)
        },
    },
}
</script>

<style></style>
