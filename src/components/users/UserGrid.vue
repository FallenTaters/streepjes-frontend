<template>
    <div id="user-grid">
        <base-button
            style="font-size: 0.7em"
            v-for="user in users"
            :key="user.username"
            @click="selectUser(user)"
            :club="user.club"
        >
            <div style="width: 100%">{{ user.name }}</div>
        </base-button>
    </div>
</template>

<script lang="ts">
import { User } from "@/type/user"
import { defineComponent } from "@vue/runtime-core"
export default defineComponent({
    props: ["users"],
    setup(props, { emit }) {
        function selectUser(user: User): void {
            emit("select", user)
        }

        return {
            selectUser,
        }
    },
})
</script>

<style scoped>
#user-grid {
    display: grid;
    height: auto;
    justify-content: stretch;
    margin-left: auto;
    margin-right: auto;
    display: grid;
    grid-template-columns: 33% 33% 33%;
    grid-auto-rows: 75px;
}
</style>
