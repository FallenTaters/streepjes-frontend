import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import { store, key } from "./store"

import BaseButton from "./components/ui/BaseButton.vue"
import Modal from "./components/ui/Modal.vue"

createApp(App)
    .use(store, key)
    .use(router)
    .component(`base-button`, BaseButton)
    .component(`modal`, Modal)
    .mount("#app")
