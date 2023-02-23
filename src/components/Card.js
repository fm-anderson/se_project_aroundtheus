class Card {
  constructor(cardData, cardSelector, handleCardClick) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector('.cards__content')
      .cloneNode(true);
  }

  getCardView() {
    this._element = this._getTemplate();
    const cardElementImage = this._element.querySelector('.cards__image');
    cardElementImage.src = this._link;
    cardElementImage.alt = this._name;
    const cardElementTitle = this._element.querySelector('.cards__title');
    cardElementTitle.textContent = this._name;
    this._setEventListenersCard();

    return this._element;
  }

  _setEventListenersCard() {
    this._element
      .querySelector('.cards__delete')
      .addEventListener('click', () => this._handleDeleteButton());

    this._likeButton = this._element.querySelector('.cards__like');
    this._likeButton.addEventListener('click', () => this._handleLikeButton());

    this._element
      .querySelector('.cards__image')
      .addEventListener('click', () =>
        this._handleCardClick({ name: this._name, link: this._link })
      );
  }

  _handleLikeButton() {
    this._likeButton.classList.toggle('cards__like-active');
  }

  _handleDeleteButton = () => {
    this._element.remove();
    this._element = null;
  };
}

export default Card;
