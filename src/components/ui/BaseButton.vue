<template>
    <div
        class="card"
        :class="{
            selected: selected,
            gladiators: gladiators,
            parabool: parabool,
            bordered: bordered,
            disabled: disabled,
        }"
    >
        <slot></slot>
    </div>
</template>

<script>
import { Club } from "@/type/member"
export default {
    props: {
        selected: {
            type: Boolean,
            default: false,
        },
        bordered: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        gladiators() {
            return this.$store.getters.club == Club.Gladiators
        },
        parabool() {
            return this.$store.getters.club == Club.Parabool
        },
    },
}
</script>

<style scoped>
.card {
    margin: 10px;
    padding: 15px;
    border-radius: 15px;
}
.card:hover {
    cursor: pointer;
}
.card.disabled {
    background-color: gray !important;
}

.bordered {
    border: 3px solid black;
    padding: 12px;
    background-color: white !important;
    color: black !important;
}
.bordered:hover {
    background-color: lightgray !important;
}
.bordered:active {
    background-color: darkgray !important;
}
.selected {
    font-weight: bold;
}

.gladiators {
    border-color: rgb(1, 79, 32) !important;
    background-color: rgb(1, 79, 32);
    color: whitesmoke;
}
.gladiators:hover {
    background-color: rgb(0, 121, 48);
}
.gladiators:active {
    background-color: rgb(51, 161, 95);
}
.gladiators.selected {
    background-color: rgb(222, 123, 4);
    color: black;
}
.gladiators.selected:hover {
    background-color: rgb(255, 150, 10);
}
.gladiators.selected:active {
    background-color: rgb(255, 184, 91);
}

.parabool {
    border-color: rgb(111, 44, 138) !important;
    background-color: rgb(111, 44, 138);
    color: whitesmoke;
}
.parabool:hover {
    background-color: rgb(153, 61, 189);
}
.parabool:active {
    background-color: rgb(170, 68, 211);
}
.parabool.selected {
    background-color: rgb(56, 0, 78);
    color: whitesmoke;
}
.parabool.selected:hover {
    background-color: rgb(95, 0, 133);
}
.parabool.selected:active {
    background-color: rgb(127, 0, 177);
}
</style>
