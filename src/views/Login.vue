<template>
    <h1>Streepjeslijst Parabool / Gladiators</h1>
    <div class="container">
        <h2>Log In</h2>
        <form @submit.prevent="login">
            <div class="form-row">
                <input
                    type="text"
                    placeholder="Username"
                    v-model="username"
                    class="input-bigger wide"
                />
            </div>
            <div class="form-row">
                <input
                    type="password"
                    placeholder="Password"
                    v-model="password"
                    class="input-bigger wide"
                />
            </div>
            <div class="form-row">
                <input type="submit" value="Log In" class="badge-link" />
            </div>
            <div v-if="errorMessage" class="errorMessage">
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

<style scoped>
.container {
    background-color: lightgray;
    border-radius: 10px;
    margin: auto;
    margin-top: 100px;
    padding: 50px;
    width: 500px;
}

.wide {
    width: 400px;
}

.form-row {
    margin: 10px;
    margin-bottom: 30px;
}
</style>
