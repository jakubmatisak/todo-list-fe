import { createI18n } from "vue-i18n";
import sk from "../locales/sk.json";
import en from "../locales/en.json";

const i18n = createI18n({
	legacy: false,
	locale: "sk",
	fallbackLocale: "en",
	messages: {
		sk: sk,
		en: en,
	},
	global: true
});

export default i18n;