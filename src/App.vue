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

<script>
import { mapGetters } from "vuex"
import { Role } from "@/type/user"
import ActiveWatcher from "@/components/activity/ActiveWatcher"

export default {
    components: { ActiveWatcher },
    name: "App",
    computed: {
        ...mapGetters(["role", "loggedIn"]),
    },
    watch: {
        role(v) {
            if (v == Role.NotAuthorized) {
                this.$router.push(`/login`)
            }
        },
    },
}
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
</style>
