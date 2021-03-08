<template>
    <div id="buttons" class="flex-even">
        <base-button
            @click="clickParabool"
            :selected="currentClub == parabool"
            class="square200"
        >
            <img
                alt="GSKV de Parabool"
                src="../assets/paraboologo.jpg"
                class="square200"
            />
        </base-button>
        <base-button
            @click="clickGladiators"
            :selected="currentClub == gladiators"
            class="square200"
        >
            <img
                alt="Lacrosse Groningen Gladiators"
                src="../assets/gladiatorslogo.jpg"
                class="square200"
            />
        </base-button>
    </div>
</template>

<script>
import { Club } from "@/type/type"

export default {
    methods: {
        clickParabool() {
            this.$store.commit("setClub", Club.Parabool)
        },
        clickGladiators() {
            this.$store.commit("setClub", Club.Gladiators)
        },
    },
    computed: {
        gladiators() {
            return Club.Gladiators
        },
        parabool() {
            return Club.Parabool
        },
        currentClub() {
            return this.$store.getters.getClub
        },
    },
}
</script>

<style scoped></style>
