import './index.css';
import logoSrc from '../images/logo.svg';

import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import {
  editModal,
  btnProfile,
  addModal,
  btnAddCard,
  validationConfig,
  selectors,
  btnAvatar,
  avatarModal,
} from '../utils/utils.js';

// images
document.querySelector('#image-logo').src = logoSrc;

// api
const api = new Api('https://around.nomoreparties.co/v1/group-12', {
  authorization: '77fde786-44a3-44dd-ae6e-76f3a1c5cf68',
  'Content-Type': 'application/json',
});

let cardSection = null;
let userId = null;

// user info
const userInfo = new UserInfo({
  userNameSelector: selectors.profTitle,
  userJobSelector: selectors.profSubtitle,
  userAvatarSelector: selectors.profAvatar,
});

// section
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([data, cards]) => {
    userId = data._id;
    userInfo.setUserInfo({
      name: data.name,
      about: data.about,
      avatar: data.avatar,
    });

    cardSection = new Section(
      {
        items: cards,
        renderer: (cardData) => {
          cardSection.addItem(renderCard(cardData, userId));
        },
      },
      selectors.cardsList
    );
    cardSection.renderItems();
  })
  .catch((error) => {
    console.log(`Error: ${error}`);
  });

// render cards
function renderCard(cardData, userId) {
  const card = new Card({
    data: { ...cardData, userId },
    selector: '#card-template',
    handlePreview: () => {
      popupImagePreview.open(cardData);
    },
    handleLike: (data) => {
      if (card.isLiked()) {
        api
          .removeLikes(data._cardId)
          .then((res) => {
            card.showLikes(res.likes);
          })
          .catch((error) => {
            console.log(`An error has occured ${error}`);
          });
      } else {
        api
          .addLikes(data._cardId)
          .then((res) => {
            card.showLikes(res.likes);
          })
          .catch((error) => {
            console.log(`An error has occured ${error}`);
          });
      }
    },
    handleDelete: (card) => {
      confirmationPopup.confirmDelete(() => {
        confirmationPopup.setSubmitText(true, 'Deleting...');
        api
          .deleteCard(card._cardId)
          .then(() => {
            card.handleDeleteButton();
            confirmationPopup.close();
          })
          .catch((error) => {
            console.log(`An error has occured ${error}`);
          })
          .finally(() => confirmationPopup.setSubmitText(false));
      });
      confirmationPopup.open();
    },
  });
  return card.getCardView();
}

// validation
const editFormValidator = new FormValidator(validationConfig, editModal);
editFormValidator.enableValidation();

const cardFormValidator = new FormValidator(validationConfig, addModal);
cardFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(validationConfig, avatarModal);
avatarFormValidator.enableValidation();

// popup with form: profile
const profileForm = new PopupWithForm({
  popupSelector: selectors.editModal,
  handleFormSubmit: (data) => {
    profileForm.setSubmitText(true);
    api
      .editUserInfo(data)
      .then((data) => {
        userInfo.setUserInfo(data);
        profileForm.close();
      })
      .catch((error) => {
        console.log(`An error has occured ${error}`);
      })
      .finally(() => profileForm.setSubmitText(false));
  },
  resetOnClose: true,
});
profileForm.setEventListeners();

// popup with form: add card
const createCardForm = new PopupWithForm({
  popupSelector: selectors.addModal,
  handleFormSubmit: (cardData) => {
    createCardForm.setSubmitText(true, 'Creating...');
    api
      .postCard(cardData)
      .then((data) => {
        cardSection.addItem(renderCard(data, userId));
        createCardForm.close();
      })
      .catch((error) => {
        console.log(`An error has occured ${error}`);
      })
      .finally(() => createCardForm.setSubmitText(false));
  },
  resetOnClose: true,
});
createCardForm.setEventListeners();

// popup with form: edit avatar
const newAvatarModal = new PopupWithForm({
  popupSelector: selectors.avatarModal,
  handleFormSubmit: (data) => {
    newAvatarModal.setSubmitText(true);
    api
      .editAvatar(data)
      .then((data) => {
        userInfo.setUserInfo(data);
        newAvatarModal.close();
      })
      .catch((error) => console.log(`An error has occured ${error}`))
      .finally(() => newAvatarModal.setSubmitText(false));
  },
  resetOnClose: true,
});
newAvatarModal.setEventListeners();

// popup with image
const popupImagePreview = new PopupWithImage({
  popupSelector: selectors.previewModal,
});
popupImagePreview.setEventListeners();

// popup with confirmation
const confirmationPopup = new PopupWithConfirmation({
  popupSelector: selectors.confirmModal,
});
confirmationPopup.setEventListeners();

btnAvatar.addEventListener('click', () => {
  avatarFormValidator.resetValidation();
  newAvatarModal.open();
});

btnAddCard.addEventListener('click', () => {
  cardFormValidator.resetValidation();
  createCardForm.open();
});

btnProfile.addEventListener('click', () => {
  const { userName, userJob } = userInfo.getUserInfo();
  document.querySelector(selectors.nameInput).value = userName;
  document.querySelector(selectors.jobInput).value = userJob;
  editFormValidator.resetValidation();
  profileForm.open();
});
