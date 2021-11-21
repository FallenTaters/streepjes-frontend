<template>
    <the-header />
    <h1>Change Password</h1>
    <form @submit.prevent="submit">
        <div>
            <label for="current-pass">Current Password</label>
            <input id="current-pass" />
        </div>
        <div>
            <label for="new-pass-1">New Password</label>
            <input id="new-pass-1" />
        </div>
        <div>
            <label for="new-pass-2">Repeat New Password</label>
            <input id="new-pass-2" />
        </div>
        <input type="submit" />
    </form>
</template>

<script lang="ts">
import { defineComponent } from "vue"

import TheHeader from "@/components/TheHeader.vue"
import { postMe } from "@/api/auth"
import { useStore } from "vuex"

export default defineComponent({
    setup() {
        const store = useStore()

        function submit() {
            const user = store.getters. ??? // TODO
            postMe()
        }

        return {submit}
    },
    components: { TheHeader },
})
</script>

<style scoped></style>
