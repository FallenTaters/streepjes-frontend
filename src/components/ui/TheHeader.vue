<template>
    <div id="header">
        <div @click="order">Order</div>
        <div v-if="showAdmin" @click="admin">Admin</div>
        <div @click="logout">
            Log Out
        </div>
    </div>
</template>

<script>
import { Role } from "@/type/user"

export default {
    methods: {
        logout() {
            this.$router.push(`/login`)
        },
        order() {
            this.$router.push(`/`)
        },
        admin() {
            this.$router.push(`/admin`)
        },
    },
    computed: {
        showAdmin() {
            return this.$store.getters.role == Role.Admin
        },
    },
}
</script>

<style scoped>
#header {
    background-color: #444444;
    color: whitesmoke;
    box-shadow: #444444 0 2px 5px;
    display: flex;
    justify-content: space-between;
}

#header > div {
    padding: 8px;
}

#header > div:hover {
    background-color: #333333;
}

#header > div:active {
    background-color: #999999;
    color: black;
}
</style>
