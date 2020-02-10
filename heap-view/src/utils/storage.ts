export const setLocale = (locale: string) =>
  window.localStorage.setItem(
    "CW_CO_LOCALE",
    (locale || "").match(/(ko-kr|ja-jp|en)/i) ? locale : "en"
  );

export const getLocale = () =>
  window.localStorage.getItem("CW_CO_LOCALE") || "ko-KR";

export const setUserEmail = (email: string) =>
  window.localStorage.setItem("CW_CO_USER_EMAIL", email);

export const getUserEmail = () =>
  window.localStorage.getItem("CW_CO_USER_EMAIL");

export const setUserToken = (token: string) =>
  window.localStorage.setItem("CW_CO_USER_TOKEN", token);

export const getUserToken = () =>
  window.localStorage.getItem("CW_CO_USER_TOKEN");

export const removeUserToken = () => {
  window.localStorage.removeItem("CW_CO_USER_TOKEN");
};
