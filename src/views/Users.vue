<template>
    <the-header></the-header>
    <h1>Users</h1>
    <div class="flex-even">
        <base-button :bordered="true" :club="0" class="w-200" @click="addUser">
            <div style="width: 100%">+ New</div>
        </base-button>
        <input
            class="input-bigger"
            type="text"
            v-model="searchString"
            placeholder="Search"
        />
    </div>
    <user-grid :users="users" @select="selectUser" />
    <modal
        v-if="showModal"
        closeText="← Back"
        @close="showModal = false"
        :height="450"
    >
        <user-form
            :username="selectedUsername"
            :newUser="newUser"
            @deleted="reload"
            @saved="reload"
        />
    </modal>
</template>

<script lang="ts">
import TheHeader from "@/components/TheHeader.vue"
import { computed, defineComponent, ref } from "vue"
import { useStore } from "@/store/index"
import { User } from "@/type/user"
import UserGrid from "@/components/users/UserGrid.vue"
import UserForm from "@/components/users/UserForm.vue"

export default defineComponent({
    setup() {
        const store = useStore()
        store.dispatch("fetchUsers")

        const searchString = ref<string>("")

        // user search and selection
        const users = computed<User[]>(() => {
            let users: User[] = store.getters.users

            if (searchString.value) {
                const search = searchString.value.toLowerCase()
                users = users.filter((user) =>
                    user.username.toLowerCase().includes(search)
                )
            }

            return users
        })

        // user adding and editing
        const showModal = ref<boolean>(false)
        const newUser = ref<boolean>(false)
        const selectedUsername = ref<string>("")

        function selectUser(user: User): void {
            showModal.value = true
            newUser.value = false
            selectedUsername.value = user.username
        }

        function addUser(): void {
            showModal.value = true
            newUser.value = true
            selectedUsername.value = ""
        }

        async function reload() {
            await store.dispatch("fetchUsers")
            showModal.value = false
        }

        return {
            reload,

            searchString,
            users,

            selectUser,
            addUser,
            showModal,
            newUser,
            selectedUsername,

            userClub: store.getters.userClub,
        }
    },
    components: {
        TheHeader,
        UserGrid,
        UserForm,
    },
})
</script>
