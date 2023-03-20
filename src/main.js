import { createApp } from "vue";
//import './style.css'
import App from "./App.vue";
import { createPinia } from "pinia";
import vuetify from "./plugins/vuetify";
import router from "./router/index";
import i18n from "./plugins/i18n";

const pinia = createPinia();

createApp(App)
	.use(vuetify)
	.use(i18n)
	.use(router)
	.use(pinia)
	.mount("#app");
