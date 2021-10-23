<template>
    <the-header></the-header>
    <h1>Members</h1>
    <div class="flex-even">
        <base-button
            :bordered="true"
            :club="userClub"
            class="w-200"
            @click="addMember"
        >
            <div style="width: 100%">+ New</div>
        </base-button>
        <input
            class="input-bigger"
            type="text"
            v-model="searchString"
            placeholder="Search"
        />
    </div>
    <member-grid :members="members" @select="selectMember" />
    <modal v-if="showModal" closeText="← Back" @close="showModal = false">
        <member-form
            :id="selectedMemberID"
            :newMember="newMember"
            @deleted="reload"
            @saved="reload"
        />
    </modal>
</template>

<script lang="ts">
import TheHeader from "@/components/TheHeader.vue"
import { computed, defineComponent, ref } from "vue"
import { useStore } from "@/store/index"
import { Member } from "@/type/member"
import MemberGrid from "@/components/members/MemberGrid.vue"
import MemberForm from "@/components/members/MemberForm.vue"
export default defineComponent({
    setup() {
        const store = useStore()
        store.dispatch("fetchMembers")

        const searchString = ref<string>("")

        const userClub = computed(() => store.getters.userClub)

        // member search and selection
        const members = computed(() => {
            let members: Member[] = store.getters.membersByUserClub

            if (searchString.value) {
                const search = searchString.value.toLowerCase()
                members = members.filter((member) =>
                    member.name.toLowerCase().includes(search)
                )
            }

            return members
        })

        // member adding and editing
        const showModal = ref<boolean>(false)
        const newMember = ref<boolean>(false)
        const selectedMemberID = ref<number>(0)

        function selectMember(member: Member): void {
            showModal.value = true
            newMember.value = false
            selectedMemberID.value = member.id
        }

        function addMember(): void {
            showModal.value = true
            newMember.value = true
            selectedMemberID.value = 0
        }

        async function reload() {
            await store.dispatch("fetchMembers")
            showModal.value = false
        }

        return {
            reload,

            searchString,
            members,

            selectMember,
            addMember,
            showModal,
            newMember,
            selectedMemberID,

            userClub: userClub,
        }
    },
    components: {
        TheHeader,
        MemberGrid,
        MemberForm,
    },
})
</script>
