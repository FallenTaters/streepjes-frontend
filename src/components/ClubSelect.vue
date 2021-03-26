<template>
    <div @click="toggleClub">
        <img :alt="alt" :src="src" class="square200" />
    </div>
</template>

<script>
import { Club } from "@/type/member"

export default {
    methods: {
        toggleClub() {
            this.$store.dispatch("unselectMember")
            if (this.club != Club.Gladiators) {
                this.$store.dispatch("setClub", Club.Gladiators)
                return
            }
            this.$store.dispatch("setClub", Club.Parabool)
        },
    },
    computed: {
        club() {
            return this.$store.getters.club
        },
        alt() {
            switch (this.club) {
                case Club.Parabool:
                    return "GSKV de Parabool"
                case Club.Gladiators:
                    return "Lacrosse Groningen Gladiators"
                default:
                    this.toggleClub()
                    return ""
            }
        },
        src() {
            switch (this.club) {
                case Club.Parabool:
                    return require("../assets/paraboologo.jpg")
                case Club.Gladiators:
                    return require("../assets/gladiatorslogo.jpg")
                default:
                    this.toggleClub()
                    return ""
            }
        },
    },
}
</script>

<style scoped></style>
