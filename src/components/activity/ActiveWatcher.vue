<template>
    <div @click="setActive">
        <div :class="showWarning ? 'shown' : 'hidden'">
            <h1>You will be logged out in {{ renderTime() }}</h1>
            <h2>Tap Screen anywhere to continue</h2>
        </div>
        <slot></slot>
    </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core"
import { mapGetters } from "vuex"
import { postActive } from "@/api/auth"

const second = 1000
const minute = 60 * second
const maxTimeInactive = 5 * minute
const warningTimeLeft = 3 * minute
const timeBetweenCalls = 0.5 * minute

export default defineComponent({
    data() {
        return {
            currentDate: new Date(),
            timeLeft: maxTimeInactive,
            showWarning: false,
            lastActiveCall: new Date(),
            interval: null,
        }
    },
    created() {
        this.setActive()
        this.makeInterval()
    },
    computed: {
        ...mapGetters(["lastActive"]),
    },
    methods: {
        calcTimeLeft() {
            this.timeLeft = maxTimeInactive - (new Date() - this.lastActive)
        },
        setActive() {
            this.$store.dispatch("refreshActive")
            this.calcTimeLeft()
            this.check()
        },
        async check() {
            // check time left
            this.calcTimeLeft()
            if (this.timeLeft < 0) {
                this.$store.dispatch("unauthorized")
                return
            } else if (this.timeLeft < warningTimeLeft) {
                this.showWarning = true
            } else {
                this.showWarning = false
            }

            // check last call
            if (new Date() - this.lastActiveCall > timeBetweenCalls) {
                const resp = await postActive()
                if (!resp.status || resp.status != 200) {
                    this.$store.dispatch("unauthorized")
                    return
                }

                this.lastActiveCall = new Date()
            }
        },
        makeInterval() {
            this.interval = setInterval(() => {
                this.check()
            }, 1000)
        },
        renderTime() {
            let minutes = Math.floor(this.timeLeft / minute)
            let seconds = Math.floor(
                (this.timeLeft - minutes * minute) / second
            )
            minutes = String(minutes).padStart(2, "0")
            seconds = String(seconds).padStart(2, "0")

            return `${minutes}:${seconds}`
        },
    },
    beforeUnmount() {
        clearInterval(this.interval)
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
