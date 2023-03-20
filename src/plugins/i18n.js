import { createI18n } from "vue-i18n";
import sk from "../locales/sk.json";
import en from "../locales/en.json";

const i18n = createI18n({
	locale: "sk",
	fallbackLocale: "en",
	messages: {
		sk: sk,
		en: en,
	}
});

export default i18n;