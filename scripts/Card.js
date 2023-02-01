import { openPopup } from './utils.js';

class Card {
  constructor(cardData, cardSelector) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector('.cards__content')
      .cloneNode(true);

    return cardElement;
  }

  getCardView() {
    this._element = this._getTemplate();
    this._setEventListenersCard();
    const cardElementImage = this._element.querySelector('.cards__image');
    cardElementImage.src = this._link;
    cardElementImage.alt = this._name;
    this._element.querySelector('.cards__title').textContent = this._name;

    return this._element;
  }

  _setEventListenersCard() {
    this._element
      .querySelector('.cards__delete')
      .addEventListener('click', () => this._handleDeleteButton(this));

    this._element
      .querySelector('.cards__like')
      .addEventListener('click', () => this._handleLikeButton(this));

    this._element
      .querySelector('.cards__image')
      .addEventListener('click', () => this._handlePreview(this));
  }

  _handleLikeButton() {
    this._element
      .querySelector('.cards__like')
      .classList.toggle('cards__like-active');
  }

  _handleDeleteButton = () => {
    this._element.remove();
  };

  _handlePreview() {
    const previewImage = document.querySelector('.modal__preview-image');
    previewImage.src = this._link;
    previewImage.alt = this._name;
    document.querySelector('.modal__preview-text').textContent = this._name;
    const previewModal = document.querySelector('#preview-modal');
    openPopup(previewModal);
  }
}

export default Card;
