const initialCards = [
  {
    name: 'Yosemite Valley',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg',
  },
  {
    name: 'Lake Louise',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg',
  },
  {
    name: 'Bald Mountains',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg',
  },
  {
    name: 'Latemar',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg',
  },
  {
    name: 'Vanoise National Park',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg',
  },
  {
    name: 'Lago di Braies',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg',
  },
];

// constants
const profileTitle = document.querySelector('#prof-title');
const profileSubtitle = document.querySelector('#prof-subtitle');

const editModal = document.querySelector('#edit-modal');
const addModal = document.querySelector('#add-modal');
const previewModal = document.querySelector('#preview-modal');
const btnProfile = document.querySelector('#edit-profile');
const btnAddCard = document.querySelector('#btn-add-card');
const closeButtons = document.querySelectorAll('.modal__close-button');

const profileFormElement = document.querySelector('#edit-modal-form');
const nameInput = document.querySelector('#name-input');
const jobInput = document.querySelector('#job-input');

const addCardFormElement = document.querySelector('#add-modal-form');
const placeInput = document.querySelector('#place-input');
const linkInput = document.querySelector('#link-input');

const previewImage = document.querySelector('.modal__preview-image');
const previewText = document.querySelector('.modal__preview-text');

const cardTemplate = document.querySelector('#card-template').content;
const cardsList = document.querySelector('.cards__list');

// event listeners
btnProfile.addEventListener('click', handleEditButton);
btnAddCard.addEventListener('click', handleAddButton);
profileFormElement.addEventListener('submit', handleProfileFormSubmit);
addCardFormElement.addEventListener('submit', handleAddCardFormSubmit);
closeButtons.forEach((button) => {
  const popup = button.closest('.modal');
  button.addEventListener('click', () => closePopup(popup));
});

//functions
function openPopup(popup) {
  popup.classList.add('modal_opened');
  popup.addEventListener('mousedown', closeByMouse);
  document.addEventListener('keydown', closeByEscape);
}

function closePopup(popup) {
  popup.classList.remove('modal_opened');
  popup.removeEventListener('mousedown', closeByMouse);
  document.removeEventListener('keydown', closeByEscape);
}

function closeByEscape(e) {
  if (e.key === 'Escape') {
    const popup = document.querySelector('.modal_opened');
    closePopup(popup);
  }
}

function closeByMouse(e) {
  if (e.target.classList.contains('modal_opened')) {
    closePopup(e.target);
  }
}

function handleEditButton() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  openPopup(editModal);
}

function handleAddButton() {
  openPopup(addModal);
}

// function handleLikeButton(e) {
//   e.target.classList.toggle('cards__like-active');
// }

// function handleDeleteButton(e) {
//   e.target.closest('.cards__content').remove();
// }

// function handlePreview(e) {
//   previewImage.src = e.target.src;
//   previewImage.alt = e.target.alt;
//   previewText.textContent = e.target.alt;
//   openPopup(previewModal);
// }

function handleProfileFormSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(editModal);
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const newCard = { name: placeInput.value, link: linkInput.value };
  renderCard(newCard);
  addCardFormElement.reset();
  closePopup(addModal);
}

// function getCardElement(data) {
//   const cardElement = cardTemplate.cloneNode(true);
//   const cardElementImage = cardElement.querySelector('.cards__image');
//   const cardElementTitle = cardElement.querySelector('.cards__title');
//   const likeButton = cardElement.querySelector('.cards__like');
//   const deleteButton = cardElement.querySelector('.cards__delete');
//   likeButton.addEventListener('click', handleLikeButton);
//   deleteButton.addEventListener('click', handleDeleteButton);
//   cardElementImage.addEventListener('click', handlePreview);

//   cardElementImage.src = data.link;
//   cardElementImage.alt = data.name;
//   cardElementTitle.textContent = data.name;

//   return cardElement;
// }

// function renderCard(data) {
//   const cardsRender = getCardElement(data);
//   cardsList.prepend(cardsRender);
// }

// initialCards.forEach(renderCard);

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
    openPopup(previewModal);
    const previewImage = document.querySelector('.modal__preview-image');
    previewImage.src = this._link;
    previewImage.alt = this._name;
    document.querySelector('.modal__preview-text').textContent = this._name;
  }
}

function renderCard(cardData) {
  const card = new Card(cardData, '#card-template');
  cardsList.prepend(card.getCardView());
}

initialCards.forEach(renderCard);
