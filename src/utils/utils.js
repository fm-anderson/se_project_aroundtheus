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

export {
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
