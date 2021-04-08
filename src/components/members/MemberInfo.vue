<template>
    <div class="text-left">
        <h3>
            {{ member.name }}
        </h3>
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
