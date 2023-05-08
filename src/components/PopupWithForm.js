import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit, resetOnClose }) {
    super({ popupSelector });
    this._handleFormSubmit = handleFormSubmit;
    this._resetOnClose = resetOnClose;
    this._form = this._popup.querySelector('.modal__form');
    this._inputList = this._popup.querySelectorAll('.modal__input');
    this._formButton = this._popup.querySelector('.modal__button');
    this._formButtonText = this._formButton.textContent;
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => (inputValues[input.name] = input.value));
    return inputValues;
  }

  setEventListeners() {
    this._form.addEventListener('submit', this._handleSubmit);
    super.setEventListeners();
  }

  _handleSubmit = (e) => {
    e.preventDefault();
    this._handleFormSubmit(this._getInputValues());
  };

  close() {
    if (this._resetOnClose) {
      this._form.reset();
    }
    super.close();
  }

  setSubmitText(submit, submitText = 'Saving...') {
    if (submit) {
      this._formButton.textContent = submitText;
    } else {
      this._formButton.textContent = this._formButtonText;
    }
  }
}
