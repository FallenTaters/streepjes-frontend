import { InjectionKey } from "vue"
import { createStore, Store, useStore as baseUseStore } from "vuex"
import createPersistedState from "vuex-persistedstate"

import { orderStore, OrderState } from "./order"
import { catalogStore, CatalogState } from "./catalog"
import { memberStore, MemberState } from "./members"
import { userStore, UserState } from "./user"

export interface State
    extends CatalogState,
        MemberState,
        OrderState,
        UserState {}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
    modules: {
        order: orderStore,
        catalog: catalogStore,
        members: memberStore,
        user: userStore,
    },
    plugins: [createPersistedState<State>()],
})

export function useStore() {
    return baseUseStore(key)
}
