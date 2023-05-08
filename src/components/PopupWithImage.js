import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
    this._previewImage = this._popup.querySelector('.modal__preview-image');
    this._previewTitle = this._popup.querySelector('.modal__preview-text');
  }

  open({ name, link }) {
    this._previewImage.src = link;
    this._previewImage.alt = `Photo of ${name}`;
    this._previewTitle.textContent = name;

    super.open();
  }
}
