<template>
    <active-watcher v-if="loggedIn">
        <router-view v-slot="{ Component }">
            <component :is="Component" />
        </router-view>
    </active-watcher>
    <div v-else>
        <router-view v-slot="{ Component }">
            <component :is="Component" />
        </router-view>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, watch } from "vue"
import { useRouter } from "vue-router"

import { useStore } from "@/store/index"
import { Role } from "@/type/user"

import ActiveWatcher from "@/components/activity/ActiveWatcher.vue"

export default defineComponent({
    components: { ActiveWatcher },
    name: "App",
    setup() {
        const store = useStore()
        const router = useRouter()

        const loggedIn = computed<boolean>(() => store.getters.loggedIn)
        const role = computed<string>(() => store.getters.role)

        // route to login on unauthorized
        watch<string>(role, (v) => {
            if (v == Role.NotAuthorized) {
                router.push(`/login`)
            }
        })

        return {
            loggedIn,
        }
    },
})
</script>

<style>
body {
    margin: 0;
    padding: 0;
    border: 0;
}

#app {
    font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
        "Lucida Sans", Arial, sans-serif;
    text-align: center;
    box-sizing: border-box;
    font-size: 1.5em;
}

#nav {
    height: 9vh;
}

.flex {
    display: flex;
}

.flex-even {
    display: flex;
    justify-content: space-evenly;
}

.flex-apart {
    display: flex;
    justify-content: space-between;
}

.flex-center {
    align-items: center;
}

.square200 {
    height: 200px;
    width: 200px;
}
.square150 {
    height: 150px;
    width: 150px;
}
.square50 {
    height: 50px;
    width: 50px;
}

.badge-link {
    background-color: darkslategrey;
    color: whitesmoke;
    text-decoration: none;
    padding: 10px 20px;
    border-radius: 5px;
    border: none;
    font-size: 1.2em;
    cursor: pointer;
}

.auto-scroll {
    overflow: auto;
}

.input-bigger {
    font-size: 20px;
    text-align: center;
    padding: 10px;
    border: 2px solid gray;
    border-radius: 5px;
}

.middled {
    align-self: center;
}

.text-left {
    text-align: left;
}

.errorMessage {
    color: red;
}

.w-100 {
    width: 100px !important;
}
.w-150 {
    width: 150px !important;
}
.w-200 {
    width: 200px !important;
}
.w-250 {
    width: 250px !important;
}
.w-300 {
    width: 300px !important;
}
.w-400 {
    width: 400px !important;
}

.align-right {
    text-align: right;
}

.ellipsis {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}

.error {
    color: red;
}

/* Form */
.form-row {
    display: flex;
    align-items: center;
}
.form-row-center {
    margin: 10px;
    margin-bottom: 30px;
}
.form-col {
    text-align: left;
    width: 50%;
    padding: 3px;
}
.form-input {
    width: stretch;
    padding: 12px;
    border-radius: 15px;
    border: 3px solid black;
    background-color: lightgray;
    font-size: 1.5rem;
}

.h3 {
    font-weight: bold;
    font-size: 1.2rem;
    margin-top: 0px;
}
</style>
