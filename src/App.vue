<template>
    <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link to="/club">Select Club</router-link>
    </div>
    <router-view />
</template>

<style>
#app {
    font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
        "Lucida Sans", Arial, sans-serif;
    text-align: center;
}
.flexer {
    display: flex;
    justify-content: center;
}
.flexer > div {
    margin: 3px;
}
</style>
