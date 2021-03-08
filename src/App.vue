<template>
    <!-- <div id="nav">
        <router-link :to="{ name: 'order' }">Order Screen</router-link>
    </div> -->
    <router-view id="view" />
</template>

<style>
#app {
    font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
        "Lucida Sans", Arial, sans-serif;
    text-align: center;
    box-sizing: border-box;
}

#nav {
    height: 9vh;
}

.flex-even {
    display: flex;
    justify-content: space-evenly;
}
.flex-even > div {
    margin: 3px;
}

.flex-apart {
    display: flex;
    justify-content: space-between;
}
.flex-apart > div {
    margin: 3px;
}

.square200 {
    height: 200px;
    width: 200px;
}
.square150 {
    height: 150px;
    width: 150px;
}
</style>
