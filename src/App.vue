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
.full-height-container {
    box-sizing: border-box;
    height: 100vh;
}
</style>
