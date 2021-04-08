import { defineComponent } from "vue"

export default function (f) {
    return defineComponent({
        setup: f,
    })
}
