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
    notification: "Notification",
    block_name: 'Profile Settings',
    address: 'Address',
    info: 'We dont know anything about this user',
    verifyOtp: 'Verify OTP',
    registerAt: 'Register At',
    edit: 'Edit',
    search: 'Search'
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
    about: "О себе",
    notification: "Уведомления",
    block_name: 'Настройки профиля',
    address: 'Адрес',
    info: 'Мы ничего не знаем о этом пользователе',
    verifyOtp: 'Подтвердить OTP',
    registerAt: 'Зарегистрирован',
    edit: 'Изменить',
    search: 'Поиск'
  },
};

export const i18n = new I18n(translations);

i18n.locale = Localization.locale;

i18n.enableFallback = true;
