<template>
    <div @click="toggleClub">
        <img :alt="alt" :src="src" class="square150" />
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue"
import { Club } from "@/type/member"
import { useStore } from "@/store/index"

export default defineComponent({
    setup() {
        const store = useStore()

        const club = computed(() => store.getters.club)

        function toggleClub() {
            store.dispatch("unselectMember")
            if (club.value != Club.Gladiators) {
                store.dispatch("setClub", Club.Gladiators)
                return
            }
            store.dispatch("setClub", Club.Parabool)
        }

        const alt = computed(() => {
            switch (club.value) {
                case Club.Parabool:
                    return "GSKV de Parabool"
                case Club.Gladiators:
                    return "Lacrosse Groningen Gladiators"
                default:
                    toggleClub()
                    return ""
            }
        })

        const src = computed(() => {
            switch (club.value) {
                case Club.Parabool:
                    return require("@/assets/paraboologo.jpg")
                case Club.Gladiators:
                    return require("@/assets/gladiatorslogo.jpg")
                default:
                    toggleClub()
                    return ""
            }
        })

        return {
            alt,
            src,
            toggleClub,
        }
    },
})
</script>

<style scoped>
.square150 {
    height: 150px;
    width: 150px;
}
</style>
