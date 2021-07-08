<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container" :style="style">
                    <div
                        v-if="closeText"
                        class="close-container"
                        :class="closeClass"
                    >
                        <button @click="emitClose" class="badge-link">
                            {{ closeText }}
                        </button>
                    </div>
                    <slot></slot>
                </div>
            </div>
        </div>
    </transition>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue"

export default defineComponent({
    props: ["closeText", "closeAbsolute", "height"],
    setup(props, { emit }) {
        function emitClose() {
            emit("close")
        }

        const closeClass = computed<string>(() => {
            if (props.closeAbsolute) {
                return "absolute"
            }
            return ""
        })

        const style = computed<string>(() => {
            if (props.height) {
                return `height: ${props.height}px;`
            }

            return ""
        })

        return {
            emitClose,
            closeClass,
            style,
        }
    },
})
</script>

<style scoped>
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
}

.modal-wrapper {
    display: table-cell;
    vertical-align: middle;
}

.modal-container {
    width: 700px;
    height: 400px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
    margin-top: 0;
    color: #42b983;
}

.modal-body {
    margin: 20px 0;
}

.modal-default-button {
    float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
    opacity: 0;
}

.modal-leave-active {
    opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}

.close-container {
    text-align: left;
    padding-bottom: 10px;
}

.absolute {
    position: absolute;
}
</style>
