<template>
    <button
        class="card flex-apart"
        :class="{
            selected: selected,
            gladiators: gladiators,
            parabool: parabool,
            bordered: bordered,
            disabled: disabled,
        }"
        :style="style"
        :type="buttonType"
        @click="clicked"
    >
        <slot></slot>
    </button>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue"
import { useStore } from "@/store/index"
import { Club } from "@/type/member"
export default defineComponent({
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
        club: {
            type: Number,
            default: null,
        },
        margin: {
            type: Number,
            default: 10,
        },
        padding: {
            type: Number,
            default: 15,
        },
        submit: {
            type: Boolean,
            default: false,
        },
    },
    setup(props, { emit }) {
        const store = useStore()

        const gladiators = computed(() => {
            return props.club
                ? props.club == Club.Gladiators
                : store.getters.club == Club.Gladiators
        })

        const parabool = computed(() => {
            return props.club
                ? props.club == Club.Parabool
                : store.getters.club == Club.Parabool
        })

        const style = computed(() => {
            return (
                `margin:${props.margin}px;` +
                `padding:${props.padding}px;` +
                `width:calc(100% - ${2 * props.margin}px);`
            )
        })

        const buttonType = computed<string>(() => {
            if (props.submit) return `submit`
            return `button`
        })

        function clicked() {
            if (!props.disabled) emit("clicked")
        }

        return {
            gladiators,
            parabool,
            style,
            buttonType,
            clicked,
        }
    },
})
</script>

<style scoped>
button {
    border: none;
    font-size: 1.1rem;
    width: 100%;
    box-sizing: border-box;
    font-family: inherit;
}

.card {
    border-radius: 15px;
    overflow: hidden;
    transition: background 250ms ease-in-out, transform 150ms ease;
}
.card:hover {
    cursor: pointer;
}
.card.disabled {
    cursor: inherit !important;
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
