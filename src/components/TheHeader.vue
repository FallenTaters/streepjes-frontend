<template>
    <div class="menu m l top">
        <div @click="order" v-if="isBartender">Order</div>
        <div @click="history" v-if="isBartender">History</div>
        <div @click="users" v-if="isAdmin">Users</div>
        <div @click="catalog" v-if="isAdmin">Catalog</div>
        <div @click="members" v-if="isAdmin">Members</div>
        <div @click="billing" v-if="isAdmin">Billing</div>
        <div @click="logout">Log Out</div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue"
import { useRouter } from "vue-router"
import { useStore } from "@/store/index"
import { Role } from "@/type/user"
import { postLogout } from "@/api/auth"

export default defineComponent({
    setup() {
        const store = useStore()
        const router = useRouter()

        const isAdmin = computed<boolean>(
            () => store.getters.role == Role.Admin
        )

        const isBartender = computed<boolean>(
            () => store.getters.role == Role.Bartender
        )

        function logout() {
            postLogout()
            store.dispatch("unauthorized")
            router.push(`/login`)
        }

        function order() {
            router.push("/")
        }

        function history() {
            router.push("/history")
        }

        function users() {
            router.push("/users")
        }

        function members() {
            router.push("/members")
        }

        function billing() {
            router.push("/billing")
        }

        function catalog() {
            router.push("/catalog")
        }

        return {
            isAdmin,
            isBartender,

            logout,
            order,
            history,
            users,
            members,
            billing,
            catalog,
        }
    },
})
</script>
