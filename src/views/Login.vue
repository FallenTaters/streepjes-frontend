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

export default {
    data() {
        return {
            username: "",
            password: "",
            errorMessage: "",
        }
    },
    methods: {
        login() {
            this.errorMessage = ""
            postLogin(this.username, this.password)
                .then(resp => {
                    switch (resp.status) {
                    }
                })
                .catch(() => {
                    this.errorMessage = "Unable to reach server."
                })
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
</style>
