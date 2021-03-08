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
    font-size: 1.5em;
}

#nav {
    height: 9vh;
}

.flex-even {
    display: flex;
    justify-content: space-evenly;
}

.flex-apart {
    display: flex;
    justify-content: space-between;
}

.square200 {
    height: 200px;
    width: 200px;
}
.square150 {
    height: 150px;
    width: 150px;
}

.badge-link {
    background-color: darkslategrey;
    color: whitesmoke;
    text-decoration: none;
    padding: 10px 20px;
    border-radius: 5px;
}

.auto-scroll {
    overflow: auto;
}
</style>
