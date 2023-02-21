export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add('modal__opened');
    document.addEventListener('keyup', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('modal__opened');
    document.removeEventListener('keyup', this._handleEscClose);
  }

  _handleEscClose(e) {
    e.preventDefault();
    if (e.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', (e) => {
      if (
        e.target.classList.contains('modal__close-button') ||
        e.target.classList.contains('modal_opened')
      ) {
        this.close();
      }
    });
  }
}
