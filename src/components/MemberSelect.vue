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

<script>
import { mapGetters } from "vuex"
import MemberInfo from "@/components/MemberInfo"

export default {
    components: { MemberInfo },
    data() {
        return {
            searchString: "",
            showModal: false,
        }
    },
    computed: {
        ...mapGetters(["selectedMember", "memberSelected", "club"]),
        members() {
            let members = this.$store.getters.byClub

            if (this.searchString) {
                const search = this.searchString.toLowerCase()
                members = members.filter(member =>
                    member.name.toLowerCase().includes(search)
                )
            }

            return members
        },
    },
    methods: {
        click() {
            if (this.memberSelected) {
                this.$store.dispatch("unselectMember")
                return
            }
            this.showModal = true
        },
        selectMember(member) {
            this.$store.dispatch("selectMember", member)
            this.showModal = false
        },
    },
}
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
