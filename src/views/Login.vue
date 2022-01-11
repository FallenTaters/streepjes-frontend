<template>
    <div class="center-align container">
        <h1 class="l m large-margin">Streepjes</h1>
        <h3 class="s large-margin">Streepjes</h3>
        <form @submit.prevent="login">
            <div class="field fill border extra">
                <input
                    class="center-align"
                    type="text"
                    v-model="username"
                    placeholder="Username"
                />
            </div>
            <div class="field fill border extra">
                <input
                    class="center-align"
                    type="password"
                    v-model="password"
                    placeholder="Password"
                />
            </div>
            <div class="large-margin">
                <button class="circle indigo large-padding" type="submit">
                    <i>login</i>
                </button>
            </div>
            <div v-if="errorMessage" class="chip red-dark-3">
                {{ errorMessage }}
            </div>
        </form>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import { useRouter } from "vue-router"

import { useStore } from "@/store/index"
import { postLogin } from "@/api/auth"
import { Role } from "@/type/user"

export default defineComponent({
    setup() {
        const store = useStore()
        const router = useRouter()

        const username = ref<string>("")
        const password = ref<string>("")
        const errorMessage = ref<string>("")

        async function login() {
            errorMessage.value = ""

            let resp
            try {
                resp = await postLogin(username.value, password.value)
            } catch {
                errorMessage.value = "Connection error"
                return
            }

            let data
            switch (resp.status) {
                case 200:
                    data = await resp.json()
                    break

                case 401:
                    errorMessage.value = "Invalid username and/or password"
                    return

                default:
                    errorMessage.value =
                        "Unknown error occured while logging in"
                    return
            }

            store.dispatch(`setRole`, data)
            switch (data) {
                case Role.NotAuthorized:
                    errorMessage.value = "Unauthorized"
                    break

                case Role.Admin:
                    router.push(`/billing`)
                    break

                case Role.Bartender:
                    router.push(`/`)
                    break

                default:
                    errorMessage.value =
                        "User permissions unclear. Contact the System Administrator."
                    break
            }
        }

        return {
            username,
            password,
            errorMessage,

            login,
        }
    },
})
</script>
