<template>
    <div class="menu l m top large-space">
        <slot></slot>
    </div>
    <div class="menu s bottom large-space">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({})
</script>
