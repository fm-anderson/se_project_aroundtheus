import FormValidator from './FormValidator.js';
import Card from './Card.js';
import { openPopup, closePopup } from './utils.js';

// cards
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
const editModal = document.querySelector('#edit-modal');
const profileTitle = document.querySelector('#prof-title');
const profileSubtitle = document.querySelector('#prof-subtitle');
const btnProfile = document.querySelector('#edit-profile');
const profileFormElement = document.querySelector('#edit-modal-form');
const nameInput = document.querySelector('#name-input');
const jobInput = document.querySelector('#job-input');

const addModal = document.querySelector('#add-modal');
const addCardFormElement = document.querySelector('#add-modal-form');
const placeInput = document.querySelector('#place-input');
const linkInput = document.querySelector('#link-input');
const btnAddCard = document.querySelector('#btn-add-card');
const cardsList = document.querySelector('.cards__list');

const closeButtons = document.querySelectorAll('.modal__close-button');

// events
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

function handleEditButton() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  openPopup(editModal);
}

function handleAddButton() {
  openPopup(addModal);
}

btnProfile.addEventListener('click', handleEditButton);
btnAddCard.addEventListener('click', handleAddButton);
profileFormElement.addEventListener('submit', handleProfileFormSubmit);
addCardFormElement.addEventListener('submit', handleAddCardFormSubmit);
closeButtons.forEach((button) => {
  const popup = button.closest('.modal');
  button.addEventListener('click', () => closePopup(popup));
});

// render cards
function renderCard(cardData) {
  const card = new Card(cardData, '#card-template');
  cardsList.prepend(card.getCardView());
}

initialCards.forEach(renderCard);

// form validation
const validationConfig = {
  inputSelector: '.modal__input',
  submitButtonSelector: '.modal__button',
  inactiveButtonClass: 'modal__button_disabled',
  inputErrorClass: 'modal__input_error',
  errorClass: 'modal__error_visible',
};

const editFormValidator = new FormValidator(validationConfig, editModal);
const cardFormValidator = new FormValidator(validationConfig, addModal);

editFormValidator.enableValidation();
cardFormValidator.enableValidation();
