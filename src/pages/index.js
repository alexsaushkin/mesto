import './index.css';
import {
  formSelector,
  errorClass,
  inactiveButtonClass,
  inputErrorClass,
  inputSelector,
  submitButtonSelector,
  cardSelector,
} from "../scripts/utils/constants.js"
import Api from "../scripts/components/Api.js";
import Card from "./../scripts/components/Card.js";
import FormValidator from "./../scripts/components/FormValidator.js";
import PopupWithForm from "./../scripts/components/PopupWithForm.js";
import PopupWithConfirm from "../scripts/components/PopupWithConfirm.js";
import PopupWithImage from "./../scripts/components/PopupWithImage.js";
import Section from "./../scripts/components/Section.js";
import UserInfo from "./../scripts/components/UserInfo.js";


// карточка
const gallery = document.querySelector(".gallery__items");

// профиль
const profileInfo = document.querySelector(".profile");
const profileAvatarBtn = profileInfo.querySelector(".profile__image");
const profileEditBtn = profileInfo.querySelector(".profile__edit-button");
const cardAddBtn = profileInfo.querySelector(".profile__add-button");

// попап профиля
const profilePopupSelector = document.querySelector("#profile-popup");
const nameInput = profilePopupSelector.querySelector(".popup__text_type_name");
const jobInput = profilePopupSelector.querySelector(".popup__text_type_profession");

// попап аватара
const avatarPopupSelector = document.querySelector("#avatar-popup");
const avatarInput = avatarPopupSelector.querySelector(".popup__text_type_image-link");

// попап формы карточки
const cardPopupSelector = document.querySelector("#card-popup");
const titleInput = cardPopupSelector.querySelector(".popup__text_type_title");
const linkInput = cardPopupSelector.querySelector(".popup__text_type_image-link");

let userId = null;

const api = new Api(
  {
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
    headers: {
      authorization: 'a3007ea4-3f85-4046-a0c2-896dfa8c559d',
      'Content-Type': 'application/json'
    }
  }
);

const userInfo = new UserInfo({nameSelector: ".profile__name-value", aboutSelector: ".profile__profession", avatarSelector: ".profile__image"});

const profilePopup = new PopupWithForm("#profile-popup", formSelector, inputSelector, submitButtonSelector, submitProfileForm);
profilePopup.setEventListeners();

const photoPopup = new PopupWithImage("#photo-popup");
photoPopup.setEventListeners();

const section = new Section({'items': [], 'renderer': createCard}, gallery);

const cardPopup = new PopupWithForm("#card-popup", formSelector, inputSelector, submitButtonSelector, submitCardForm);
cardPopup.setEventListeners();

const avatarPopup = new PopupWithForm("#avatar-popup", formSelector, inputSelector, submitButtonSelector, submitAvatarForm);
avatarPopup.setEventListeners();

const confirmCardDeletePopup = new PopupWithConfirm("#confirm-popup", (cardId, card) => {
  return api.deleteCard(cardId)
    .then(() => {
      card.remove();
      confirmCardDeletePopup.close();
    })
    .catch(err => {
      console.log(err);
    })
});
confirmCardDeletePopup.setEventListeners();

// добавление валидации форм
const cardValidator = new FormValidator({
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass
}, cardPopupSelector);
cardValidator.enableValidation();

const profileValidator = new FormValidator({
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass
}, profilePopupSelector);
profileValidator.enableValidation();

const avatarValidator = new FormValidator({
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass
}, avatarPopupSelector);
avatarValidator.enableValidation();

function submitProfileForm(data) {
  return api.editProfile(data)
    .then((res) => {
      userInfo.setUserInfo(res);
    })
    .catch(err => {
      console.log(err);
    });
}

function openProfilePopup() {
  const infoData = userInfo.getUserInfo();
  nameInput.value = infoData.name;
  jobInput.value = infoData.about;
  profileValidator.resetValidation();
  profilePopup.open();
}

function submitCardForm(data) {
  return api.addNewCard(data)
    .then(res => {
      section.addItem(res);
    })
    .catch(err => {
      console.log(err);
    });
}

function openCardPopup() {
  cardValidator.resetValidation();
  cardPopup.open();
}

function createCard(data) {
  return new Card(
    data,
    userId,
    cardSelector,
    photoPopup.open.bind(photoPopup),
    (cardId, card) => {
      confirmCardDeletePopup.open(cardId, card);
    },
    (card) => {
      return api.likeCard(data._id)
        .then(res => {
          card.like();
          card.updateLikes(res.likes);
        })
        .catch(err => {
          console.log(err);
        })
    },
    (card) => {
      return api.dislikeCard(data._id)
        .then(res => {
          card.dislike();
          card.updateLikes(res.likes);
        })
        .catch(err => {
          console.log(err);
        })
    }
    ).generateCard();
}

function submitAvatarForm(data) {
  return api.updateAvatar(data)
    .then((res) => {
      userInfo.setAvatar(res);
    })
    .catch(err => {
      console.log(err);
    });
}

function openAvatarPopup() {
  avatarInput.value = userInfo.getAvatar();
  avatarValidator.resetValidation();
  avatarPopup.open();
}

// обработчики кнопок профиля
profileAvatarBtn.addEventListener("click", () => {
  openAvatarPopup();
});

cardAddBtn.addEventListener("click", () => {
  openCardPopup();
});

profileEditBtn.addEventListener("click", () => {
  openProfilePopup();
});

// подгружаем профиль и карточки
Promise.all([api.getProfile(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);
    userInfo.setAvatar(userData);
    userId = userData._id;
    section.setItems(cards);
    section.renderElements();
  })
  .catch(err => {
    console.log(err);
  });

