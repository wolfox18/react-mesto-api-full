export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-btn",
  inactiveButtonClass: "button_inactive",
  inputErrorClass: "popup__input_type_error",
};
export const formValidators = {};
export const popupsConfig = {
  openedClass: "popup_opened",
  closeButtonSelector: ".popup__close-btn",
  inputSelector: ".popup__input",
  formSelector: ".popup__form",
  nameSelector: ".popup__image-name",
  imageSelector: ".popup__image",
  submitButtonSelector: ".popup__save-btn"
};

export function checkResponce(res) {
  if (!res.ok) return Promise.reject(res.status);
    return res.json();
}

export const BASE_URL = "https://api.nshikalenko.nomoredomains.club";
