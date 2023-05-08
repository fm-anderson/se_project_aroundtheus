class Card {
  constructor({ data, selector, handlePreview, handleLike, handleDelete }) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = selector;
    this._handlePreview = handlePreview;
    this._likes = data.likes;
    this._cardId = data._id;
    this._userId = data.userId;
    this._ownerId = data.owner._id;
    this._handleLike = handleLike;
    this._handleDelete = handleDelete;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector('.cards__content')
      .cloneNode(true);
  }

  getCardView() {
    this._element = this._getTemplate();
    this._cardElementImage = this._element.querySelector('.cards__image');
    this._cardElementTitle = this._element.querySelector('.cards__title');
    this._cardElementImage.src = this._link;
    this._cardElementImage.alt = this._name;
    this._cardElementTitle.textContent = this._name;
    this._deleteButton = this._element.querySelector('.cards__delete');
    this._likeButton = this._element.querySelector('.cards__like-button');
    this._likeCounter = this._element.querySelector('.cards__like-counter');

    this.showLikes(this._likes);
    this._removeDeleteButton();
    this._setEventListenersCard();
    return this._element;
  }

  _setEventListenersCard() {
    this._deleteButton.addEventListener('click', () =>
      this._handleDelete(this)
    );

    this._likeButton.addEventListener('click', () => this._handleLike(this));

    this._cardElementImage.addEventListener('click', () =>
      this._handlePreview({ name: this._name, link: this._link })
    );
  }

  isLiked() {
    return this._likes.some((item) => item._id === this._userId);
  }

  showLikes(data) {
    this._likes = data || [];
    this._likeCounter.textContent = this._likes.length;
    this._handleLikeButton();
  }

  _handleLikeButton() {
    if (this.isLiked()) {
      this._likeButton.classList.add('cards__like-active');
    } else {
      this._likeButton.classList.remove('cards__like-active');
    }
  }

  _removeDeleteButton() {
    if (this._userId !== this._ownerId) {
      this._deleteButton.remove();
    }
  }

  handleDeleteButton = () => {
    this._element.remove();
    this._element = null;
  };
}

export default Card;
