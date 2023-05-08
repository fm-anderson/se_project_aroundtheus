export default class Popup {
  constructor({ popupSelector }) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  _handleEscClose(e) {
    e.preventDefault();
    if (e.key === 'Escape') {
      this.close();
    }
  }

  open() {
    this._popup.classList.add('modal_opened');
    document.addEventListener('keyup', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('modal_opened');
    document.removeEventListener('keyup', this._handleEscClose);
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
