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
    props: ["member"],
    setup() {
        return {
            renderPrice,
        }
    },
})
</script>

<style></style>
