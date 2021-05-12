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
    width: 100px;
}
.w-150 {
    width: 150px;
}
.w-200 {
    width: 200px;
}
.w-250 {
    width: 250px;
}
.w-300 {
    width: 300px;
}

.align-right {
    text-align: right;
}

.ellipsis {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
</style>
