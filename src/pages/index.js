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
  cardsList,
  validationConfig,
} from '../utils/constants.js';

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

// popup with form: add card
const cardFormValidator = new FormValidator(validationConfig, addModal);

const createCardForm = new PopupWithForm('#add-modal', (data) => {
  const createdCard = new Card(data, '#card-template', (data) => {
    popupImagePreview.open(data);
    createdCard.getCardView();
  });
  cardSection.addItem(createdCard.getCardView());
  createCardForm.close();
});
createCardForm.setEventListeners();

btnAddCard.addEventListener('click', () => handleAddCardForm());

function handleAddCardForm() {
  createCardForm.open();
  cardFormValidator.enableValidation();
}

// user info
const userInfo = new UserInfo({
  userNameSelector: '#prof-title',
  userJobSelector: '#prof-subtitle',
});

// popup with form: update profile
const editFormValidator = new FormValidator(validationConfig, editModal);

const profileForm = new PopupWithForm('#edit-modal', (data) => {
  userInfo.setUserInfo(data);
  profileForm.close();
});
profileForm.setEventListeners();

btnProfile.addEventListener('click', () => handleEditProfileForm());

function handleEditProfileForm() {
  const { userName, userJob } = userInfo.getUserInfo();
  document.querySelector('#name-input').value = userName;
  document.querySelector('#job-input').value = userJob;
  editFormValidator.enableValidation();
  profileForm.open();
}
