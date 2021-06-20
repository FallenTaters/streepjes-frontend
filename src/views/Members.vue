<template>
    <the-header></the-header>
    <div>members overview coming</div>
</template>

<script lang="ts">
import TheHeader from "@/components/TheHeader.vue"
import { defineComponent } from "vue"
import { useStore } from "vuex"
export default defineComponent({
    setup() {
        const store = useStore()
    },
    components: {
        TheHeader,
    },
})
</script>

<style scoped></style>
