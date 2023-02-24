import './index.css';
import logoSrc from '../images/logo.svg';
import jacquesSrc from '../images/jacques-cousteau.jpg';

import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {
  initialCards,
  editModal,
  btnProfile,
  addModal,
  btnAddCard,
  validationConfig,
  selectors,
} from '../utils/constants.js';

// images
document.querySelector('#image-logo').src = logoSrc;
document.querySelector('#image-jacques').src = jacquesSrc;

// form validator
const cardFormValidator = new FormValidator(validationConfig, addModal);
const editFormValidator = new FormValidator(validationConfig, editModal);
cardFormValidator.enableValidation();
editFormValidator.enableValidation();

// section
const cardSection = new Section(
  { items: initialCards, renderer: renderCard },
  selectors.cardsList
);
cardSection.renderItems();

// render cards
function renderCard(data) {
  const card = new Card(data, selectors.cardTemplate, (data) => {
    popupImagePreview.open(data);
  });
  cardSection.addItem(card.getCardView());
}

// popup with image
const popupImagePreview = new PopupWithImage(selectors.previewModal);
popupImagePreview.setEventListeners();

// popup with form: add card
const createCardForm = new PopupWithForm(selectors.addModal, (data) => {
  renderCard(data);
  createCardForm.close();
});
createCardForm.setEventListeners();
btnAddCard.addEventListener('click', handleAddCardForm);

function handleAddCardForm() {
  createCardForm.open();
  cardFormValidator.disableButton();
}

// user info
const userInfo = new UserInfo({
  userNameSelector: selectors.profTitle,
  userJobSelector: selectors.profSubtitle,
});

// popup with form: update profile
const profileForm = new PopupWithForm(selectors.editModal, (data) => {
  userInfo.setUserInfo(data);
  profileForm.close();
});
profileForm.setEventListeners();
btnProfile.addEventListener('click', handleEditProfileForm);

function handleEditProfileForm() {
  const { userName, userJob } = userInfo.getUserInfo();
  document.querySelector(selectors.nameInput).value = userName;
  document.querySelector(selectors.jobInput).value = userJob;
  editFormValidator.disableButton();
  profileForm.open();
}
