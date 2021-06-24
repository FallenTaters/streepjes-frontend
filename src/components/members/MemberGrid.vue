<template>
    <div id="member-grid">
        <base-button
            style="font-size: 0.7em"
            v-for="member in members"
            :key="member.id"
            @click="selectMember(member)"
            :club="member.club"
        >
            {{ member.name }}
        </base-button>
    </div>
</template>

<script lang="ts">
import { Member } from "@/type/member"
import { defineComponent } from "@vue/runtime-core"
export default defineComponent({
    props: ["members"],
    setup(props, { emit }) {
        function selectMember(member: Member): void {
            emit("select", member)
        }

        return {
            selectMember,
        }
    },
})
</script>

<style scoped>
#member-grid {
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
