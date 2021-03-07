<template>
    <div class="card" :class="select">
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        selected: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        select() {
            return this.selected ? "selected" : ""
        },
    },
}
</script>

<style scoped>
.card {
    margin: 10px;
    padding: 15px;
    border: 3px solid lightgray;
    border-radius: 15px;
}

.card:hover {
    background-color: lightgray;
    border: 3px solid gray;
    cursor: pointer;
}

.selected {
    background-color: gray;
}
</style>
