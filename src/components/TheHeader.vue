<template>
    <div id="header">
        <div @click="order" v-if="isBartender">Order</div>
        <div @click="history" v-if="isBartender">History</div>
        <div @click="users" v-if="isAdmin">Users</div>
        <div @click="catalog" v-if="isAdmin">Catalog</div>
        <div @click="members" v-if="isAdmin">Members</div>
        <div @click="billing" v-if="isAdmin">Billing</div>
        <div>
            <div @click="toggleDropdown">
                {{ username }}
            </div>
            <div id="auth-dropdown" v-if="showDropdown">
                <ul>
                    <li class="dropdown-item">
                        <button
                            class="dropdown-item-button"
                            @click="changePassword"
                        >
                            Change Password
                        </button>
                    </li>
                    <li class="dropdown-item">
                        <button class="dropdown-item-button" @click="logout">
                            Log Out
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue"
import { useRouter } from "vue-router"
import { useStore } from "@/store/index"
import { Role } from "@/type/user"
import { postLogout } from "@/api/auth"

export default defineComponent({
    setup() {
        const store = useStore()
        const router = useRouter()
        store.dispatch("fetchMe")

        const isAdmin = computed<boolean>(
            () => store.getters.role == Role.Admin
        )

        const isBartender = computed<boolean>(
            () => store.getters.role == Role.Bartender
        )

        const username = computed<string>(() => store.getters.username)

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

        const showDropdown = ref<boolean>(false)
        function toggleDropdown() {
            showDropdown.value = !showDropdown.value
        }

        return {
            isAdmin,
            isBartender,
            username,

            logout,
            order,
            history,
            users,
            members,
            billing,
            catalog,

            showDropdown,
            toggleDropdown,
        }
    },
})
</script>

<style scoped>
#header {
    background-color: #444;
    color: whitesmoke;
    box-shadow: #444 0 2px 5px;
    display: flex;
    justify-content: space-between;
    height: 45px;
}

#header > div {
    padding: 8px;
}

#header > div:hover {
    background-color: #333;
}

#header > div:active {
    background-color: #999;
    color: black;
}

.dropdown-item {
    background-color: #444;
}

.dropown-item:hover {
    background-color: #333;
}

.dropdown-item-button {
    margin: 0px;
    width: 100%;
    font-size: 1.15rem;
    height: 45px;
    background-color: #444;
    border: none;
    color: whitesmoke;
}

.dropdown-item-button:hover {
    background-color: #333;
}

.dropdown-item-button:active {
    background-color: #999;
    color: black;
}

ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
}
</style>
