<template>
    <div class="text-left">
        <h3>
            {{ member.name }}
        </h3>
        Current Bill: {{ renderPrice(member.debt) }}
    </div>
</template>

<script lang="ts">
import { renderPrice } from "@/type/catalog"

export default {
    props: ["member"],
    methods: {
        renderPrice(x: number) {
            return renderPrice(x)
        },
    },
}
</script>

<style></style>
