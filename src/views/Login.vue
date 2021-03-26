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

<script>
import { postLogin } from "@/api/auth"
import { Role } from "@/type/user"

export default {
    data() {
        return {
            username: "",
            password: "",
            errorMessage: "",
        }
    },
    methods: {
        async login() {
            this.errorMessage = ""

            let resp
            try {
                resp = await postLogin(this.username, this.password)
            } catch {
                this.errorMessage = "Connection error"
                return
            }

            let data
            switch (resp.status) {
                case 200:
                    data = await resp.json()
                    break

                case 401:
                    this.errorMessage = "Invalid username and/or password"
                    return

                default:
                    this.errorMessage = "Unknown error occured while loggin in"
                    return
            }

            this.$store.dispatch(`setRole`, data)
            switch (data) {
                case Role.NotAuthorized:
                    this.errorMessage = "Unauthorized"
                    break

                case Role.Admin:
                    this.$router.push(`/admin`)
                    break

                case Role.Bartender:
                    this.$router.push(`/order`)
                    break
            }
        },
    },
}
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

.errorMessage {
    color: red;
}
</style>
