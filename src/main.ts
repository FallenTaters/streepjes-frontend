import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"

import BaseButton from "./components/ui/BaseButton.vue"

createApp(App)
    .use(store)
    .use(router)
    .component(`base-button`, BaseButton)
    .mount("#app")
