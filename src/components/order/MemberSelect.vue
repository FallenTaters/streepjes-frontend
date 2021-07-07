<template>
    <div class="flex">
        <base-button :bordered="true" @click="click" style="width: 100%">
            <member-info v-if="memberSelected" :member="selectedMember" />
            <div v-else>No member selected</div>
        </base-button>
        <modal
            v-if="showModal"
            closeText="← Back"
            @close="showModal = false"
            :closeAbsolute="true"
        >
            <div>
                <div style="text-align: right">
                    <input
                        class="input-bigger"
                        type="text"
                        v-model="searchString"
                        placeholder="Search"
                    />
                </div>
                <member-grid :members="members" @select="selectMember" />
            </div>
        </modal>
    </div>
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
            console.log("compute")
            let members: Member[] = store.getters.membersByClub(club.value)

            if (searchString.value) {
                const search = searchString.value.toLowerCase()
                members = members.filter((member) =>
                    member.name.toLowerCase().includes(search)
                )
            }

            return members
        })

        function click() {
            if (memberSelected.value) {
                store.dispatch("unselectMember")
                return
            }
            showModal.value = true
        }

        function selectMember(member: Member) {
            store.dispatch("selectMember", member)
            showModal.value = false
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
        }
    },
    components: { MemberInfo, MemberGrid },
})
</script>
