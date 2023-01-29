function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add(inputErrorClass);
  errorMessageEl.textContent = inputEl.validationMessage;
  errorMessageEl.classList.add(errorClass);
}

function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove(inputErrorClass);
  errorMessageEl.textContent = inputEl.validationMessage;
  errorMessageEl.classList.remove(errorClass);
}

function checkInputValidity(formEl, inputEl, opt) {
  if (!inputEl.validity.valid) {
    return showInputError(formEl, inputEl, opt);
  }
  hideInputError(formEl, inputEl, opt);
}

function disableButton(submitBtn, inactiveButtonClass) {
  submitBtn.classList.add(inactiveButtonClass);
  submitBtn.disabled = true;
}

function enableButton(submitBtn, inactiveButtonClass) {
  submitBtn.classList.remove(inactiveButtonClass);
  submitBtn.disabled = false;
}

function toggleButtonState(inputEls, submitBtn, { inactiveButtonClass }) {
  if (hasInvalidInput(inputEls)) {
    disableButton(submitBtn, inactiveButtonClass);
    return;
  }
  enableButton(submitBtn, inactiveButtonClass);
}

function hasInvalidInput(inputList) {
  return !inputList.every((inputElement) => inputElement.validity.valid);
}

function setEventListeners(formEl, elRef) {
  const { inputSelector, submitButtonSelector, inactiveButtonClass } = elRef;
  const inputEls = [...formEl.querySelectorAll(inputSelector)];
  const submitBtn = formEl.querySelector(submitButtonSelector);
  formEl.addEventListener('reset', () => {
    disableButton(submitBtn, inactiveButtonClass);
  });
  inputEls.forEach((inputEl) => {
    inputEl.addEventListener('input', () => {
      checkInputValidity(formEl, inputEl, elRef);
      toggleButtonState(inputEls, submitBtn, elRef);
    });
  });
}

function enableValidation(elRef) {
  const formEls = [...document.querySelectorAll(elRef.formSelector)];
  formEls.forEach((formEl) => {
    formEl.addEventListener('submit', (e) => {
      e.preventDefault();
    });

    setEventListeners(formEl, elRef);
  });
}

enableValidation({
  formSelector: '.modal__form',
  inputSelector: '.modal__input',
  submitButtonSelector: '.modal__button',
  inactiveButtonClass: 'modal__button_disabled',
  inputErrorClass: 'modal__input_error',
  errorClass: 'modal__error_visible',
});
