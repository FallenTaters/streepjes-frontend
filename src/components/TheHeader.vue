<template>
    <div id="header">
        <div @click="order" v-if="isBartender">Order</div>
        <div @click="history" v-if="isBartender">History</div>
        <div @click="users" v-if="isAdmin">Users</div>
        <div @click="members" v-if="isAdmin">Catalog</div>
        <div @click="members" v-if="isAdmin">Members</div>
        <div @click="billing" v-if="isAdmin">Billing</div>
        <div @click="logout">Log Out</div>
    </div>
</template>

<script>
import { Role } from "@/type/user"
import { postLogout } from "@/api/auth"

export default {
    methods: {
        logout() {
            postLogout()
            this.$store.dispatch("unauthorized")
            this.$router.push(`/login`)
        },
        order() {
            this.$router.push(`/`)
        },
        history() {
            this.$router.push(`/history`)
        },
        users() {
            this.$router.push(`/users`)
        },
        members() {
            this.$router.push(`/members`)
        },
        billing() {
            this.$router.push(`/billing`)
        },
    },
    computed: {
        isAdmin() {
            return this.$store.getters.role == Role.Admin
        },
        isBartender() {
            return this.$store.getters.role == Role.Bartender
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
