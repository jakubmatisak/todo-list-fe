import { createApp } from "vue";
//import './style.css'
import App from "./App.vue";
import { createPinia } from "pinia";
import vuetify from "./plugins/vuetify";
import router from "./router/index";
import i18n from "./plugins/i18n";
import Toast from "vue-toastification";

import "vue-toastification/dist/index.css";
const options = {
	position: "bottom-right",
	timeout: 5000,
	closeOnClick: true,
};

const pinia = createPinia();

createApp(App)
	.use(vuetify)
	.use(i18n)
	.use(router)
	.use(pinia)
	.use(Toast, options)
	.mount("#app");


