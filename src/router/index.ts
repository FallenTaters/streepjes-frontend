import { Role } from "@/type/user"
import {
    createRouter,
    createWebHistory,
    NavigationGuard,
    RouteRecordRaw,
} from "vue-router"
import { store } from "@/store/index"

const authGuard: NavigationGuard = function (to, from, next) {
    const role = store.getters.role
    if (!role || role == Role.NotAuthorized) next({ name: "login" })
    else next()
}

function roleGuard(role: string): NavigationGuard {
    return function (to, from, next) {
        const actual = store.getters.role
        if (!actual || actual != role) next({ name: "login" })
        else next()
    }
}

const routes: Array<RouteRecordRaw> = [
    {
        path: "/:pathMatch(.*)*",
        redirect: "/",
    },
    {
        path: "/login",
        name: "login",
        component: () => import("../views/Login.vue"),
    },
    {
        path: "/",
        name: "order",
        component: () => import("../views/Order.vue"),
        beforeEnter: authGuard,
    },
    {
        path: "/history",
        name: "history",
        component: () => import("../views/History.vue"),
        beforeEnter: roleGuard(Role.Bartender),
    },
    {
        path: "/billing",
        name: "billing",
        component: () => import("../views/Billing.vue"),
        beforeEnter: roleGuard(Role.Admin),
    },
    {
        path: "/catalog",
        name: "catalog",
        component: () => import("../views/Catalog.vue"),
        beforeEnter: roleGuard(Role.Admin),
    },
    {
        path: "/members",
        name: "members",
        component: () => import("../views/Members.vue"),
        beforeEnter: roleGuard(Role.Admin),
    },
    {
        path: "/users",
        name: "users",
        component: () => import("../views/Users.vue"),
        beforeEnter: roleGuard(Role.Admin),
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

export default router
