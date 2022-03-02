<template>
    <header-wrapper>
        <a @click="order" v-if="isBartender"><i>shopping_cart</i></a>
        <a @click="history" v-if="isBartender"><i>history</i></a>
        <a @click="users" v-if="isAdmin"><i>manage_accounts</i></a>
        <a @click="catalog" v-if="isAdmin"><i>local_bar</i></a>
        <a @click="members" v-if="isAdmin"><i>people</i></a>
        <a @click="billing" v-if="isAdmin"><i>attach_money</i></a>
        <a @click="logout"><i>logout</i></a>
    </header-wrapper>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue"
import { useRouter } from "vue-router"
import { useStore } from "@/store/index"
import { Role } from "@/type/user"
import { postLogout } from "@/api/auth"
import HeaderWrapper from "./HeaderWrapper.vue"

export default defineComponent({
    components: { HeaderWrapper },
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
