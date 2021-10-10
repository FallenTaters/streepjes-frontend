<template>
    <base-button :bordered="true" @click="click" class="flex flex-center">
        <member-info v-if="memberSelected" :member="selectedMember" />
        <div v-else style="width: 100%">No member selected</div>
    </base-button>
    <modal
        v-if="showModal"
        closeText="← Back"
        @close="showModal = false"
        :closeAbsolute="true"
    >
        <div>
            <div style="text-align: right">
                <form @submit.prevent="submitMemberSearch">
                    <input
                        ref="memberNameInput"
                        class="input-bigger"
                        type="text"
                        v-model="searchString"
                        placeholder="Search"
                    />
                </form>
            </div>
            <div style="height: 400px; overflow: auto">
                <member-grid :members="members" @select="selectMember" />
            </div>
        </div>
    </modal>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue"
import { useStore } from "@/store/index"
import { Club, Member } from "@/type/member"
import MemberInfo from "@/components/members/MemberInfo.vue"
import MemberGrid from "@/components/members/MemberGrid.vue"

export default defineComponent({
    setup() {
        const store = useStore()

        const searchString = ref<string>("")
        const showModal = ref<boolean>(false)

        const selectedMember = computed(() => store.getters.selectedMember)
        const memberSelected = computed(() => store.getters.memberSelected)
        const club = computed<Club>(() => store.getters.club)

        const members = computed<Member[]>(() => {
            let members: Member[] = store.getters.membersByClub(club.value)

            if (searchString.value) {
                const search = searchString.value.toLowerCase()
                members = members.filter((member) =>
                    member.name.toLowerCase().includes(search)
                )
            }

            return members
        })

        const memberNameInput = ref<HTMLElement | null>(null)

        function click() {
            if (memberSelected.value) {
                store.dispatch("unselectMember")
                return
            }
            showModal.value = true

            setTimeout(() => {
                memberNameInput.value?.focus()
            }, 100)
        }

        function selectMember(member: Member) {
            store.dispatch("selectMember", member)
            showModal.value = false
        }

        function submitMemberSearch(): boolean {
            if (members.value.length == 1) {
                selectMember(members.value[0])
                return true
            }
            return false
        }

        return {
            searchString,
            showModal,
            selectedMember,
            memberSelected,
            club,
            members,

            click,
            selectMember,
            submitMemberSearch,

            memberNameInput,
        }
    },
    components: { MemberInfo, MemberGrid },
})
</script>
