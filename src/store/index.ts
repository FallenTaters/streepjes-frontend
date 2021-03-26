import { createStore } from "vuex"
import createPersistedState from "vuex-persistedstate"

import orderStore from "./order"
import catalogStore from "./catalog"
import memberStore from "./members"
import userStore from "./user"

export default createStore({
    modules: {
        order: orderStore,
        catalog: catalogStore,
        members: memberStore,
        user: userStore,
    },
    plugins: [createPersistedState()],
})
