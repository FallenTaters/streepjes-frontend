<template>
    <div>
        <h1>Select Member</h1>
        <div class="flex-even">
            <router-link to="/" class="badge-link">← Back</router-link>
            <input
                class="input-bigger"
                type="text"
                v-model="searchString"
                placeholder="Search"
            />
        </div>
        <div id="member-grid">
            <base-button
                v-for="member in members"
                :key="member.id"
                @click="selectMember(member)"
            >
                {{ member.name }}
            </base-button>
        </div>
    </div>
</template>

<script>
export default {
    created() {
        if (!this.$store.getters.isClubChosen) {
            this.$router.push({ name: "order" })
        }
    },
    data() {
        return {
            searchString: "",
        }
    },
    computed: {
        members() {
            let members = this.$store.getters.members
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
        selectMember(member) {
            this.$store.commit("selectMember", member)
            this.$router.push({ name: "order" })
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
