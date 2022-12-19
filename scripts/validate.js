const settingsObj = {
  formSelector: '.popup__form',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_inactive',
  inputErrorClass: 'popup__text_type_error',
  errorClass: 'popup__error_visible'
};

const showInputError = (settingsObj, formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(settingsObj.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settingsObj.errorClass);
};

const hideInputError = (settingsObj, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settingsObj.inputErrorClass);
  errorElement.classList.remove(settingsObj.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(settingsObj, formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(settingsObj, formElement, inputElement);
  }
};

const validateFormPopup = (popupElement) => {
  const inputList = Array.from(popupElement.querySelectorAll(settingsObj.inputSelector));
  const buttonElement = popupElement.querySelector(settingsObj.submitButtonSelector);
  const formElement = popupElement.querySelector(settingsObj.formSelector);
  toggleButtonState(settingsObj, inputList, buttonElement);

  inputList.forEach((inputElement) => {
    hideInputError(settingsObj, formElement, inputElement);
  })
};

const setEventListeners = (settingsObj, formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(settingsObj.inputSelector));
  const buttonElement = formElement.querySelector(settingsObj.submitButtonSelector);
  toggleButtonState(settingsObj, inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(settingsObj, inputList, buttonElement);
    });
  });
};

const enableValidation = (settingsObj) => {
  const formList = Array.from(document.querySelectorAll(settingsObj.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(settingsObj, formElement);
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (settingsObj, inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(settingsObj.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(settingsObj.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

enableValidation(settingsObj);
