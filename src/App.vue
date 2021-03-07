<template>
    <div id="nav">
        <router-link :to="{ name: 'club-select' }">Home</router-link> |
        <router-link :to="{ name: 'order' }">Order Screen</router-link>
    </div>
    <router-view id="view" />
</template>

<style>
#app {
    font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
        "Lucida Sans", Arial, sans-serif;
    text-align: center;
    box-sizing: border-box;
}

#view {
    margin-top: 50px;
}

.flexer {
    display: flex;
    justify-content: center;
}
.flexer > div {
    margin: 3px;
}
</style>
