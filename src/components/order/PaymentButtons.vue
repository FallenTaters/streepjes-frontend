<template>
    <div class="flex-even">
        <base-button
            @click="addToBill"
            class="paymentButton"
            style="line-height: 3rem"
            :disabled="!selectedMember"
        >
            <h2>Member</h2>
        </base-button>
        <base-button
            @click="directPayment"
            class="paymentButton"
            style="line-height: 2.7rem"
            :disabled="selectedMember && selectedMember.id > 0"
        >
            <h2>Anonymous</h2>
        </base-button>

        <modal
            v-if="showModal"
            closeText="← Back"
            @close="showModal = false"
            :closeAbsolute="true"
        >
            <div style="font-size: 1.3em">
                {{ showBill ? "Add To Bill" : "Direct Payment" }}
            </div>
            <div style="padding: 30px; text-align: left; height: 200px">
                <div v-if="showBill">
                    <member-info :member="selectedMember"> </member-info>
                    <div>Amount: {{ renderPrice(totalPrice) }}</div>
                    <hr />
                    <b>Total: {{ billTotal }}</b>
                </div>
                <div v-else>
                    <p>
                        <b>Amount: {{ renderPrice(totalPrice) }}</b>
                    </p>
                    <p>Use the PIN machine or cash to fulfill the payment.</p>
                </div>
            </div>
            <div style="margin-top: 10px">
                <base-button @click="confirm">Confirm</base-button>
            </div>
            <div class="errorMessage">
                {{ errorMsg }}
            </div>
        </modal>
    </div>
</template>

<script lang="ts">
import { ref, computed, defineComponent } from "vue"

import MemberInfo from "@/components/members/MemberInfo.vue"
import BaseButton from "@/components/ui/BaseButton.vue"

import { renderPrice } from "@/type/catalog"
import { postOrder } from "@/api/order"
import { OrderStatus } from "@/type/order"
import { Member } from "@/type/member"
import { useStore } from "@/store/index"

export default defineComponent({
    setup() {
        const store = useStore()

        const selectedMember = computed<Member | null>(
            () => store.getters.selectedMember
        )
        const totalPrice = computed<number>(() => store.getters.totalPrice)

        // bill
        const showBill = ref<boolean>(false)

        const billTotal = computed<string>(() => {
            const debt = selectedMember.value ? selectedMember.value.debt : 0
            return renderPrice(totalPrice.value + debt)
        })

        // buttons
        const showModal = ref<boolean>(false)

        function addToBill() {
            if (!selectedMember.value) {
                return
            }
            showModal.value = true
            showBill.value = true
        }

        function directPayment() {
            if (selectedMember.value) {
                return
            }
            showModal.value = true
            showBill.value = false
        }

        // confirm
        const errorMsg = ref<string>("")
        let timeOut: number

        function errorMessage(msg: string) {
            clearTimeout(timeOut)
            errorMsg.value = msg
            timeOut = setTimeout(() => (errorMsg.value = ""), 10000)
        }

        async function confirm() {
            const o = Object.assign({}, store.getters.order)
            if (showBill.value) {
                o.status = OrderStatus.Open
            } else {
                o.status = OrderStatus.Paid
                o.member = null
            }

            postOrder(o)
                .then((resp) => {
                    if (resp.status !== 200) throw ""
                    if (selectedMember.value) {
                        selectedMember.value.debt += totalPrice.value
                    }
                    store.dispatch("clearOrder")
                })
                .catch(() => {
                    errorMessage("Unable to place order")
                })
        }

        return {
            selectedMember,
            totalPrice,

            errorMsg,
            showModal,
            showBill,
            billTotal,

            renderPrice,

            addToBill,
            directPayment,
            confirm,
        }
    },
    components: { MemberInfo, BaseButton },
})
</script>

<style scoped>
.paymentButton {
    padding: 15px;
    height: 50px;
    width: 200px;
}
.paymentButton > h2 {
    margin: 0px;
}
</style>
