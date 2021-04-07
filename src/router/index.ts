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
        path: "/admin",
        name: "admin",
        component: () => import("../views/Admin.vue"),
    },
    {
        path: "/history",
        name: "history",
        component: () => import("../views/History.vue"),
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router
