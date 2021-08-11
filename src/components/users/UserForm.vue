<template>
    <div>
        <form @submit.prevent="">
            <div class="form-row">
                <div class="form-col">
                    <label for="username">Username</label>
                </div>
                <div class="form-col">
                    <input
                        id="username"
                        v-model="userUsername"
                        class="form-input"
                        :disabled="!newUser"
                    />
                </div>
            </div>

            <div class="form-row" v-if="newUser">
                <div class="form-col">
                    <label for="password">Password</label>
                </div>
                <div class="form-col">
                    <input
                        id="password"
                        v-model="password"
                        type="password"
                        class="form-input"
                    />
                </div>
            </div>

            <div class="form-row">
                <div class="form-col">
                    <label for="userName">Name</label>
                </div>
                <div class="form-col">
                    <input
                        id="userName"
                        v-model="userName"
                        class="form-input"
                    />
                </div>
            </div>

            <div class="form-row">
                <div class="form-col">
                    <label for="userClub">Club</label>
                </div>
                <div class="form-col">
                    <select id="userClub" v-model="userClub" class="form-input">
                        <option :value="Club.Parabool">de Parabool</option>
                        <option :value="Club.Gladiators">Gladiators</option>
                    </select>
                </div>
            </div>

            <div class="form-row">
                <div class="form-col">
                    <label for="userRole">Role</label>
                </div>
                <div class="form-col">
                    <select id="userRole" v-model="userRole" class="form-input">
                        <option>{{ Role.Bartender }}</option>
                        <option>{{ Role.Admin }}</option>
                    </select>
                </div>
            </div>

            <div class="form-row">
                <div class="form-col">
                    <base-button
                        v-if="!newUser"
                        :club="myClub"
                        :margin="0"
                        @click="deleteMem"
                    >
                        Delete User
                    </base-button>
                </div>
                <div class="form-col">
                    <base-button :club="myClub" :margin="0" @click="saveUser">
                        {{ saveText }}
                    </base-button>
                </div>
            </div>

            <div class="error">
                <span>{{ errorText }}</span>
            </div>
        </form>
    </div>
</template>

<script lang="ts">
import { deleteUser, postUser } from "@/api/users"
import { useStore } from "@/store/index"
import { Club } from "@/type/member"
import { User, Role } from "@/type/user"
import { computed, defineComponent, ref, watch } from "@vue/runtime-core"

export default defineComponent({
    props: {
        newUser: {
            type: Boolean,
            default: false,
        },
        username: {
            type: String,
            default: "",
        },
    },
    setup(props, { emit }) {
        const store = useStore()
        const userName = ref<string>("")
        const userUsername = ref<string>("")
        const userRole = ref<string>("")
        const userClub = ref<Club>(Club.Unknown)
        const errorText = ref<string>("")
        const password = ref<string>("")

        const saveText = computed<string>(() =>
            props.newUser ? "Add User" : "Save Changes"
        )
        const myClub = computed<Club>(() => store.getters.userClub)

        const originalUser = computed<User | undefined>(() =>
            store.getters.users.find((m: User) => m.username == props.username)
        )

        watch(
            props,
            () => {
                if (!props.newUser) loadUser()
                else clearForm()
            },
            { immediate: true }
        )

        function loadUser() {
            if (!originalUser.value) return
            userUsername.value = originalUser.value.username
            userName.value = originalUser.value.name
            userClub.value = originalUser.value.club
            userRole.value = originalUser.value.role
        }

        function clearForm() {
            userUsername.value = ""
            userName.value = ""
            userClub.value = Club.Unknown
            userRole.value = ""
            password.value = ""
        }

        async function saveUser() {
            errorText.value = ""
            const user: User = {
                username: userUsername.value,
                club: userClub.value,
                name: userName.value,
                role: userRole.value,
            }

            if (props.newUser) user.password = password.value

            try {
                const resp = await postUser(user)
                if (resp.status === 200) {
                    emit("saved")
                    return
                }

                errorText.value = await resp.text()
            } catch (e) {
                errorText.value = "connection error"
            }
        }

        async function deleteMem() {
            errorText.value = ""

            try {
                const resp = await deleteUser(props.username)
                if (resp.status === 200) {
                    emit("deleted")
                    return
                }
            } catch (e) {
                errorText.value = "connection error"
            }
        }

        return {
            userName,
            saveText,
            errorText,
            userClub,
            userRole,
            userUsername,
            myClub,
            password,

            saveUser,
            deleteMem,

            Club,
            Role,
        }
    },
})
</script>
