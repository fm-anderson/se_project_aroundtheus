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
const profileTitle = document.querySelector('#profile-title');
const profileSubtitle = document.querySelector('#profile-subtitle');

const editModal = document.querySelector('#edit-modal');
const addModal = document.querySelector('#add-modal');
const btnProfile = document.querySelector('#edit-profile');
const btnAddCard = document.querySelector('#btn-add-card');
const btnCloseEdit = document.querySelector('#close-edit-modal');
const btnCloseAdd = document.querySelector('#close-add-modal');

const profileFormElement = document.querySelector('#edit-modal-form');
const nameInput = document.querySelector('#name-input');
const jobInput = document.querySelector('#job-input');

const addCardFormElement = document.querySelector('#add-modal-form');
const placeInput = document.querySelector('#place-input');
const linkInput = document.querySelector('#link-input');

const cardTemplate = document.querySelector('#card-template').content;
const cardsList = document.querySelector('.cards__list');

// event listeners
btnProfile.addEventListener('click', handleEditButton);
btnAddCard.addEventListener('click', handleAddButton);
btnCloseEdit.addEventListener('click', () => closePopup(editModal));
btnCloseAdd.addEventListener('click', () => closePopup(addModal));
profileFormElement.addEventListener('submit', handleProfileFormSubmit);
addCardFormElement.addEventListener('submit', console.log('new card added!'));

//functions
function openPopup(popup) {
  popup.classList.add('modal_opened');
}

function closePopup(popup) {
  popup.classList.remove('modal_opened');
}

function handleEditButton() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  openPopup(editModal);
}

function handleAddButton() {
  // nameInput.value = profileTitle.textContent;
  // jobInput.value = profileSubtitle.textContent;
  openPopup(addModal);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(editModal);
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardElementImage = cardElement.querySelector('.cards__image');
  const cardElementTitle = cardElement.querySelector('.cards__title');

  cardElementImage.src = data.link;
  cardElementImage.alt = data.name;
  cardElementTitle.textContent = data.name;

  return cardElement;
}

function renderCard(data) {
  const cardsRender = getCardElement(data);
  cardsList.prepend(cardsRender);
}

initialCards.forEach(renderCard);
