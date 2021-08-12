<template>
    <div>
        <form @submit.prevent="">
            <div class="form-row">
                <div class="form-col">
                    <label for="memberName">Name</label>
                </div>
                <div class="form-col">
                    <input
                        id="memberName"
                        v-model="memberName"
                        class="form-input"
                    />
                </div>
            </div>

            <div class="form-row">
                <div class="form-col">
                    <base-button
                        v-if="!newMember"
                        :club="userClub"
                        :margin="0"
                        @click="deleteMem"
                    >
                        Delete Member
                    </base-button>
                </div>
                <div class="form-col">
                    <base-button
                        :club="userClub"
                        :margin="0"
                        @click="saveMember"
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
import { deleteMember, postMember } from "@/api/members"
import { useStore } from "@/store/index"
import { Club, Member } from "@/type/member"
import { computed, defineComponent, ref, watch } from "@vue/runtime-core"

export default defineComponent({
    props: ["newMember", "id"],
    setup(props, { emit }) {
        const store = useStore()
        const memberName = ref<string>("")
        const errorText = ref<string>("")

        const saveText = computed<string>(() =>
            props.newMember ? "Add Member" : "Save Changes"
        )
        const userClub = computed<Club>(() => store.getters.userClub)

        const originalMember = computed<Member | undefined>(() =>
            store.getters.members.find((m: Member) => m.id == props.id)
        )

        watch(
            props,
            () => {
                memberName.value = ""
                if (!props.newMember && originalMember.value)
                    memberName.value = originalMember.value.name
            },
            { immediate: true }
        )

        async function saveMember() {
            errorText.value = ""
            const member: Member = {
                id: props.newMember ? 0 : props.id,
                club: userClub.value,
                name: memberName.value,
                debt: originalMember.value ? originalMember.value.debt : 0,
            }

            try {
                const resp = await postMember(member)
                if (resp.status === 200) {
                    emit("saved")
                    return
                }

                errorText.value = await resp.text()
            } catch (e) {
                errorText.value = "connection error"
            }
        }

        async function deleteMem() {
            errorText.value = ""

            try {
                const resp = await deleteMember(props.id)
                if (resp.status === 200) {
                    emit("deleted")
                    return
                }

                errorText.value = await resp.text()
            } catch (e) {
                errorText.value = "connection error"
            }
        }

        return {
            memberName,
            saveText,
            errorText,
            userClub,

            saveMember,
            deleteMem,
        }
    },
})
</script>
