import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;

    this._form = this._popup.querySelector('.modal__form');
    this._formButton = this._popup.querySelector('modal__button');
    this._inputList = this._popup.querySelectorAll('.modal__input');
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
    this._form.reset();
    super.close();
  }
}
