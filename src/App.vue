<template>
    <div id="nav">
        <router-link to="/">Home</router-link>
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
