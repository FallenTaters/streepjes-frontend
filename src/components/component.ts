import { defineComponent } from "vue"

export default function (
    f: () => Record<string, unknown>
): ReturnType<typeof defineComponent> {
    return defineComponent({
        setup: f,
    })
}
