const validationConfig = {
  inputSelector: '.modal__input',
  submitButtonSelector: '.modal__button',
  inactiveButtonClass: 'modal__button_disabled',
  inputErrorClass: 'modal__input_error',
  errorClass: 'modal__error_visible',
};

const selectors = {
  nameInput: '#name-input',
  jobInput: '#job-input',
  profTitle: '#prof-title',
  profSubtitle: '#prof-subtitle',
  profAvatar: '#avatar-image',
  previewModal: '#preview-modal',
  cardTemplate: '#card-template',
  editModal: '#edit-modal',
  addModal: '#add-modal',
  confirmModal: '#confirm-modal',
  avatarModal: '#avatar-modal',
  btnProfile: '#edit-profile',
  btnAddCard: '#btn-add-card',
  btnAvatar: '#btn-avatar',
  cardsList: '.cards__list',
};

const editModal = document.querySelector(selectors.editModal);
const addModal = document.querySelector(selectors.addModal);
const avatarModal = document.querySelector(selectors.avatarModal);
const btnProfile = document.querySelector(selectors.btnProfile);
const btnAddCard = document.querySelector(selectors.btnAddCard);
const btnAvatar = document.querySelector(selectors.btnAvatar);
const cardsList = document.querySelector(selectors.cardsList);

// const initialCards = [
//   {
//     name: 'Yosemite Valley',
//     link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg',
//   },
//   {
//     name: 'Lake Louise',
//     link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg',
//   },
//   {
//     name: 'Bald Mountains',
//     link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg',
//   },
//   {
//     name: 'Latemar',
//     link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg',
//   },
//   {
//     name: 'Vanoise National Park',
//     link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg',
//   },
//   {
//     name: 'Lago di Braies',
//     link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg',
//   },
// ];

export {
  // initialCards,
  editModal,
  btnProfile,
  btnAvatar,
  addModal,
  btnAddCard,
  cardsList,
  validationConfig,
  selectors,
  avatarModal,
};
