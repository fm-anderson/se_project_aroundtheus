import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
    this._modalForm = this._popup.querySelector('.modal__form');
    this._submitButton = this._popup.querySelector('.modal__button');
    this._submitButtonText = this._submitButton.textContent;
  }

  setSubmitText(submit, submitText = 'Saving...') {
    if (submit) {
      this._submitButton.textContent = submitText;
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }

  confirmDelete(confirmation) {
    this._handleFormSubmit = confirmation;
  }

  setEventListeners() {
    super.setEventListeners();
    this._modalForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleFormSubmit();
    });
  }
}
