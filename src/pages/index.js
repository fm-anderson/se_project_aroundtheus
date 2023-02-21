import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
// import { openPopup, closePopup } from '../components/utils.js';
import { initialCards } from '../utils/constants.js';

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
  cardFormValidator.disableButton();
}

function handleEditButton() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  openPopup(editModal);
}

function handleAddButton() {
  openPopup(addModal);
}

// btnProfile.addEventListener('click', handleEditButton);
// btnAddCard.addEventListener('click', handleAddButton);
// profileFormElement.addEventListener('submit', handleProfileFormSubmit);
// addCardFormElement.addEventListener('submit', handleAddCardFormSubmit);
// closeButtons.forEach((button) => {
//   const popup = button.closest('.modal');
//   button.addEventListener('click', () => closePopup(popup));
// });

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

// section
const cardSection = new Section(
  { items: initialCards, renderer: renderCard },
  '.cards__list'
);
cardSection.renderItems();

// render cards
function renderCard(cardData) {
  const card = new Card(cardData, '#card-template', (data) => {
    popupImagePreview.open(data);
  });
  cardsList.prepend(card.getCardView());
}

// popup with image
const popupImagePreview = new PopupWithImage('#preview-modal');
popupImagePreview.setEventListeners();
