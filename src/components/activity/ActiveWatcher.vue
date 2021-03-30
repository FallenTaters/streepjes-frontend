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
import { postActive, postLogout } from "@/api/auth"

const second = 1000
const minute = 60 * second
const maxTimeInactive = 5 * minute
const warningTimeLeft = 3 * minute
const timeBetweenCalls = 1 * minute

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
        ...mapGetters(["loggedIn", "lastActive"]),
    },
    watch: {
        loggedIn(v) {
            if (v) {
                this.makeInterval()
            } else {
                clearInterval(this.interval)
            }
        },
    },
    methods: {
        calcTimeLeft() {
            this.timeLeft = maxTimeInactive - (new Date() - this.lastActive)
        },
        async setActive() {
            this.$store.dispatch("refreshActive")
            this.calcTimeLeft()
            this.check()
        },
        check() {
            // check time left
            this.calcTimeLeft()
            if (this.timeLeft < 0) {
                postLogout()
                this.showWarning = false
                clearInterval(this.interval)
                this.$store.dispatch("unauthorized")
                return
            } else if (this.timeLeft < warningTimeLeft) {
                this.showWarning = true
            } else {
                this.showWarning = false
            }

            // check last call
            if (new Date() - this.lastActiveCall > timeBetweenCalls) {
                postActive()
                this.lastActiveCall = new Date()
            }
        },
        makeInterval() {
            if (!this.loggedIn) {
                return
            }
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
