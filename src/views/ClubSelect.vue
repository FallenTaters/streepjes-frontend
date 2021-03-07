<template>
    <h1>Select Club</h1>
    <div id="buttons" class="flexer">
        <base-button @click="clickParabool">
            <img
                alt="GSKV de Parabool"
                src="../assets/paraboologo.jpg"
                width="200"
                hiehgt="200"
            />
        </base-button>
        <div id="spacer" />
        <base-button @click="clickGladiators">
            <img
                alt="Lacrosse Groningen Gladiators"
                src="../assets/gladiatorslogo.jpg"
                width="200"
                hiehgt="200"
            />
        </base-button>
    </div>
</template>

<script>
export default {
    methods: {
        clickParabool() {
            alert("parabool")
        },
        clickGladiators() {
            alert("gladiators")
        },
    },
}
</script>

<style scoped>
#spacer {
    width: 100px;
}
#buttons {
    margin-top: 100px;
}
</style>
