<template>
    <div class="text-left">
        <p class="h3">
            {{ member.name }}
        </p>
        Current Bill: {{ renderPrice(member.debt) }}
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { renderPrice } from "@/type/catalog"

export default defineComponent({
    setup() {
        return {
            renderPrice,
        }
    },
    props: ["member"],
})
</script>

<style></style>
