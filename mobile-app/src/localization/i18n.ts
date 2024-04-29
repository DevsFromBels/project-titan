import * as Localization from "expo-localization"
import { I18n } from "i18n-js"

const translations = {
	en: { welcome: "Hello", signup: "Sign Up", signin: "Sign In" },
	ru: { welcome: "Привет", signup: "Зарегистрироваться", signin: "Войти" },
}

export const i18n = new I18n(translations)

i18n.locale = Localization.locale

i18n.enableFallback = true
