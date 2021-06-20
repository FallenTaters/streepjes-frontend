<template>
    <div>
        <form @submit.prevent="saveCategory">
            <div class="form-row">
                <div class="form-col">
                    <label for="categoryName">Name</label>
                </div>
                <div class="form-col">
                    <input
                        id="categoryName"
                        v-model="categoryName"
                        class="form-input"
                    />
                </div>
            </div>

            <div class="form-row">
                <div class="form-col">
                    <base-button
                        :club="userClub"
                        :margin="0"
                        @click="discardCategory"
                    >
                        {{ deleteText }}
                    </base-button>
                </div>
                <div class="form-col">
                    <base-button
                        :club="userClub"
                        :margin="0"
                        @click="saveCategory"
                    >
                        {{ saveText }}
                    </base-button>
                </div>
            </div>

            <div class="error">
                <span>{{ errorText }}</span>
            </div>
        </form>
    </div>
</template>

<script lang="ts">
import { defineComponent, watch, ref, computed } from "vue"

import { Category } from "@/type/catalog"
import { useStore } from "@/store/index"
import BaseButton from "../ui/BaseButton.vue"
import { Club } from "@/type/member"
import { deleteCategory, postCategory } from "@/api/catalog"

export default defineComponent({
    props: ["id", "newCategory"],
    setup(props, { emit }) {
        const store = useStore()

        const userClub = ref<Club>(store.getters.userClub)

        let categoryID = 0
        const categoryName = ref<string>("")

        const errorText = ref<string>("")

        function clearForm() {
            categoryID = 0
            categoryName.value = ""
            errorText.value = ""
        }

        function loadCategory() {
            let category: Category = store.getters.categories.find(
                (c: Category) => c.id == props.id
            )

            categoryID = category.id
            categoryName.value = category.name

            errorText.value = ""
        }

        if (!props.newCategory) {
            loadCategory()
        }
        watch(props, () => {
            if (!props.newCategory) loadCategory()
            else clearForm()
        })

        const saveText = computed(() =>
            props.newCategory ? "Add new category" : "Save changes"
        )
        const deleteText = computed(() =>
            props.newCategory ? "Discard" : "Delete"
        )

        async function discardCategory() {
            errorText.value = ""
            if (props.newCategory) {
                emit("deleted")
                return
            }

            try {
                const resp = await deleteCategory(props.id)
                if (resp.status === 200) {
                    emit("deleted")
                    return
                }

                errorText.value = await resp.text()
            } catch (e) {
                errorText.value = "connection error"
                return
            }
        }

        async function saveCategory() {
            errorText.value = ""
            const category: Category = {
                id: props.newCategory ? 0 : categoryID,
                name: categoryName.value,
            }

            try {
                const resp = await postCategory(category)
                if (resp.status === 200) {
                    emit("saved")
                    return
                }

                errorText.value = await resp.text()
            } catch (e) {
                errorText.value = "connection error"
            }
        }

        return {
            categoryName,

            userClub,

            saveText,
            deleteText,
            errorText,

            discardCategory,
            saveCategory,
        }
    },
    components: { BaseButton },
})
</script>
