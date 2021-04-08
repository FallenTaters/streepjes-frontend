<template>
    <div class="flex">
        <base-button :bordered="true" @click="click" style="width: 100%">
            <member-info v-if="memberSelected" :member="selectedMember" />
            <div v-else>No member selected</div>
        </base-button>
        <modal v-if="showModal">
            <div>
                <div class="flex-apart">
                    <button @click="showModal = false" class="badge-link">
                        ← Back
                    </button>
                    <input
                        class="input-bigger"
                        type="text"
                        v-model="searchString"
                        placeholder="Search"
                    />
                    <div></div>
                </div>
                <div id="member-grid">
                    <base-button
                        style="font-size: 0.7em"
                        v-for="member in members"
                        :key="member.id"
                        @click="selectMember(member)"
                    >
                        {{ member.name }}
                    </base-button>
                </div>
            </div>
        </modal>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue"
import { useStore } from "@/store/index"
import { Member } from "@/type/member"
import MemberInfo from "@/components/members/MemberInfo.vue"

export default defineComponent({
    setup() {
        const store = useStore()

        const searchString = ref<string>("")
        const showModal = ref<boolean>(false)

        const selectedMember = computed(() => store.getters.selectedMember)
        const memberSelected = computed(() => store.getters.memberSelected)
        const club = computed(() => store.getters.club)

        const members = computed(() => {
            let members: Member[] = store.getters.byClub

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
    components: { MemberInfo },
})
</script>

<style scoped>
#member-grid {
    display: grid;
    height: 80vh;
    justify-content: stretch;
    margin-left: auto;
    margin-right: auto;
    display: grid;
    grid-template-columns: 33% 33% 33%;
    grid-auto-rows: 75px;
}
</style>
