<template>
    <div class="flex-even">
        <base-button
            @click="addToBill"
            class="square150"
            style="line-height: 3rem"
            :disabled="selectedMember.id <= 0"
        >
            <h2>Add to Bill</h2>
        </base-button>
        <base-button
            @click="directPayment"
            class="square150"
            style="line-height: 2.7rem"
            :disabled="selectedMember.id > 0"
        >
            <h2>Direct Payment</h2>
        </base-button>
        <modal v-if="showModal">
            <div class="flex-apart">
                <button @click="showModal = false" class="badge-link">
                    ← Back
                </button>
                <div style="font-size: 1.3em">
                    {{ showBill ? "Add To Bill" : "Direct Payment" }}
                </div>
                <div></div>
            </div>
            <div style="padding: 30px; text-align: left; height: 200px;">
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
                    <p>
                        Use the PIN machine or cash to fulfill the payment.
                    </p>
                </div>
            </div>
            <div style="margin-top: 10px;">
                <base-button @click="confirm">Confirm</base-button>
            </div>
            <div class="errorMessage">
                {{ errorMsg }}
            </div>
        </modal>
    </div>
</template>

<script>
import { mapGetters } from "vuex"
import MemberInfo from "@/components/members/MemberInfo"
import BaseButton from "@/components/ui/BaseButton.vue"
import { renderPrice } from "@/type/catalog"
import { postOrder } from "@/api/order"
import { OrderStatus } from "@/type/order"

export default {
    components: { MemberInfo, BaseButton },
    data() {
        return {
            showModal: false,
            showBill: false,
            errorMsg: "",
            timeOut: null,
        }
    },
    computed: {
        ...mapGetters(["selectedMember", "totalPrice", "order"]),
        billTotal() {
            return renderPrice(this.totalPrice + this.selectedMember.debt)
        },
    },
    methods: {
        addToBill() {
            if (!this.selectedMember.id || this.selectedMember.id == 0) {
                return
            }
            this.showModal = true
            this.showBill = true
        },
        directPayment() {
            if (this.selectedMember.id > 0) {
                return
            }
            this.showModal = true
            this.showBill = false
        },
        renderPrice(price) {
            return renderPrice(price)
        },
        async confirm() {
            const o = Object.assign({}, this.order)
            if (this.showBill) {
                o.status = OrderStatus.Open
            } else {
                o.status = OrderStatus.Paid
                o.member = null
            }

            const resp = await postOrder(o)
            switch (resp.status) {
                case 200:
                    if (this.selectedMember) {
                        this.selectedMember.debt += this.totalPrice
                    }

                    this.$store.dispatch("clearOrder")
                    return
                case 401:
                    this.$store.dispatch("unauthorized")
                    return
                default:
                    this.errorMessage("Unable to place order")
                    return
            }
        },
        errorMessage(msg) {
            clearTimeout(this.timeOut)
            this.errorMsg = msg
            this.timeOut = setTimeout(() => (this.errorMsg = ""), 10000)
        },
    },
}
</script>

<style></style>
