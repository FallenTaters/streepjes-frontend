<template>
    <div class="card">
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: ["emit"],
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
</style>
