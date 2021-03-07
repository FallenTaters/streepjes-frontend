import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "club-select",
        component: () => import("../views/ClubSelect.vue"),
    },
    {
        path: "/order",
        name: "order",
        component: () => import("../views/Order.vue"),
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router
