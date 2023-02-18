import './index.css';
import {
  errorClass,
  inactiveButtonClass,
  inputErrorClass,
  inputSelector,
  submitButtonSelector
} from "./../scripts/settings"
import Api from "../scripts/components/Api";
import Card from "./../scripts/components/Card.js";
import FormValidator from "./../scripts/components/FormValidator.js";
import PopupWithForm from "./../scripts/components/PopupWithForm.js";
import PopupWithConfirm from "../scripts/components/PopupWithConfirm.js";
import PopupWithImage from "./../scripts/components/PopupWithImage.js";
import Section from "./../scripts/components/Section.js";
import UserInfo from "./../scripts/components/UserInfo.js";


// карточка
const cardSelector = "#gallery-element";
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

const profilePopup = new PopupWithForm("#profile-popup", submitProfileForm);
profilePopup.setEventListeners();

const photoPopup = new PopupWithImage("#photo-popup");
photoPopup.setEventListeners();

const section = new Section({'items': [], 'renderer': createCard}, gallery);

const cardPopup = new PopupWithForm("#card-popup", submitCardForm);
cardPopup.setEventListeners();

const avatarPopup = new PopupWithForm("#avatar-popup", submitAvatarForm);
avatarPopup.setEventListeners();

const confirmCardDeletePopup = new PopupWithConfirm("#confirm-popup", (cardId, card) => {
  api.deleteCard(cardId)
    .then(res => {
      card.remove();
    })
    .finally(res => {
      confirmCardDeletePopup.close();
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
  profilePopup.renderLoading(true, "Сохранение...");
  api.editProfile(data)
    .then((res) => {
      userInfo.setUserInfo(res);
    })
    .finally(() => {
      profilePopup.renderLoading(false);
      profilePopup.close();
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
  cardPopup.renderLoading(true, "Сохранение...");
  api.addNewCard(data)
    .then(res => {
      section.addItem(res);
    })
    .finally(res => {
      cardPopup.renderLoading(false);
      cardPopup.close();
    });
}

function openCardPopup() {
  titleInput.value = "";
  linkInput.value = "";
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
      api.likeCard(data._id)
        .then(res => {
          card.like();
          card.updateLikes(res.likes);
        })
    },
    (card) => {
      api.dislikeCard(data._id)
        .then(res => {
          card.dislike();
          card.updateLikes(res.likes);
        })
    }
    ).generateCard();
}

function submitAvatarForm(data) {
  avatarPopup.renderLoading(true, "Сохранение...");
  api.updateAvatar(data)
    .then((res) => {
      userInfo.setAvatar(res);
    })
    .finally(() => {
      avatarPopup.renderLoading(false);
      avatarPopup.close();
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
api.getProfile()
  .then(res => {
    userInfo.setUserInfo(res);
    userInfo.setAvatar(res);
    userId = res._id;
    return api.getInitialCards()
  .then(cards => {
    section.setItems(cards);
    section.renderElements();
  })
});
