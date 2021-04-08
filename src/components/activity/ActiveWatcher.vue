<template>
    <div @click="setActive">
        <div :class="showWarning ? 'shown' : 'hidden'">
            <h1>You will be logged out in {{ timeLeftString }}</h1>
            <h2>Tap Screen anywhere to continue</h2>
        </div>
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onBeforeUnmount } from "vue"

import { useStore } from "@/store/index"
import { postActive } from "@/api/auth"
import { renderTime, minute } from "@/type/time"

const maxTimeInactive = 5 * minute
const warningTimeLeft = 3 * minute
const timeBetweenCalls = 0.5 * minute

export default defineComponent({
    setup() {
        const store = useStore()
        const lastActive = computed<Date>(() => store.getters.lastActive)

        // time left before lock
        const timeLeft = ref<number>(maxTimeInactive)
        const timeLeftString = computed<string>(() =>
            renderTime(timeLeft.value)
        )
        function calcTimeLeft() {
            const inactive = new Date().getTime() - lastActive.value.getTime()
            timeLeft.value = maxTimeInactive - inactive
        }

        // check every second
        const showWarning = ref<boolean>(false)
        const lastActiveCall = ref<Date>(new Date())
        async function check() {
            // calculate time left and show warning
            calcTimeLeft()
            if (timeLeft.value < 0) {
                store.dispatch("unauthorized")
                return
            } else if (timeLeft.value < warningTimeLeft) {
                showWarning.value = true
            } else {
                showWarning.value = false
            }

            // check last API call
            if (
                new Date().getTime() - lastActiveCall.value.getTime() >
                timeBetweenCalls
            ) {
                const resp = await postActive()
                if (!resp.status || resp.status != 200) {
                    store.dispatch("unauthorized")
                    return
                }

                lastActiveCall.value = new Date()
            }
        }

        // interval for checking
        let interval = 0
        function makeInterval() {
            interval = setInterval(() => {
                check()
            }, 1000)
        }
        onBeforeUnmount(() => clearInterval(interval))

        // refresh on any click
        function setActive() {
            store.dispatch("refreshActive")
            calcTimeLeft()
            check()
        }

        // get started
        setActive()
        makeInterval()

        return { showWarning, timeLeftString, setActive }
    },
})
</script>

<style>
.hidden {
    display: none;
}
.shown {
    position: absolute;
    height: 100vh;
    width: 100vw;
    background-color: black;
    color: white;
    padding-top: 35vh;
    z-index: 10000;
}
</style>
