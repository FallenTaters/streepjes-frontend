<template>
    <h1>Select Member</h1>
    <input type="text" v-model="searchString" />
</template>

<script>
export default {
    data() {
        return {
            searchString: "",
        }
    },
}
</script>

<style></style>
