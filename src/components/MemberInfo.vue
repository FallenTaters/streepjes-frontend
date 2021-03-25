<template>
    <div class="text-left">
        <h3>
            {{ member.name }}
        </h3>
        Current Bill: {{ member.debt.print() }}
    </div>
</template>

<script>
export default {
    props: ["member"],
}
</script>

<style></style>
