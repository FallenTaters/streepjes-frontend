import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"

const routes: Array<RouteRecordRaw> = [
    {
        path: "/login",
        name: "login",
        component: () => import("../views/Login.vue"),
    },
    {
        path: "/",
        name: "order",
        component: () => import("../views/Order.vue"),
    },
    {
        path: "/:pathMatch(.*)*",
        redirect: "/",
    },
    {
        path: "/history",
        name: "history",
        component: () => import("../views/History.vue"),
    },
    {
        path: "/billing",
        name: "billing",
        component: () => import("../views/Billing.vue"),
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router
