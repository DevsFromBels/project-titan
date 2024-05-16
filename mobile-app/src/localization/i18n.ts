import * as Localization from "expo-localization";
import { I18n } from "i18n-js";

const translations = {
  en: {
    welcome: "Hello",
    signup: "Sign Up",
    signin: "Sign In",
    profile: "Profile",
    home: "Home",
    create: "Create",
    market: "Market",
    menu: "Menu",
    setting: "Setting",
    about: "About",
  },
  ru: {
    welcome: "Привет",
    signup: "Зарегистрироваться",
    signin: "Войти",
    profile: "Профиль",
    home: "Главная",
    create: "Создать",
    market: "Рынок",
    menu: "Меню",
    about: "О себе"
  },
};

export const i18n = new I18n(translations);

i18n.locale = Localization.locale;

i18n.enableFallback = true;
