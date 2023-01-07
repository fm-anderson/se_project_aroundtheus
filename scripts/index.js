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

const profileTitle = document.querySelector('#profileTitle');
const profileSubtitle = document.querySelector('#profileSubtitle');

const modal = document.querySelector('#modal');
const btnEditProfile = document.querySelector('#btnEditProfile');
const btnCloseEditProfile = document.querySelector('#btnCloseEditProfile');

const profileFormElement = document.querySelector('#modalForm');
const nameInput = document.querySelector('#nameInput');
const jobInput = document.querySelector('#jobInput');
const btnSaveUpdates = document.querySelector('#btnSaveUpdates');

btnEditProfile.addEventListener('click', handleEditButton);
btnCloseEditProfile.addEventListener('click', handleCloseButton);
btnSaveUpdates.addEventListener('click', handleProfileFormSubmit);

function handleEditButton() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  modal.classList.add('modal_opened');
}

function handleCloseButton() {
  modal.classList.remove('modal_opened');
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  modal.classList.remove('modal_opened');
}
