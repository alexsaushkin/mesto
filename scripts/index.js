import { initialCards } from "./data.js";
import { inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass} from "./settings.js"
import Card from "./components/Card.js";
import FormValidator from "./components/FormValidator.js";
import PopupWithForm from "./components/PopupWithForm.js";
import PopupWithImage from "./components/PopupWithImage.js";
import Section from "./components/Section.js";
import UserInfo from "./components/UserInfo.js";


// карточка
const cardSelector = "#gallery-element";
const gallery = document.querySelector(".gallery__items");

// профиль
const profileInfo = document.querySelector(".profile");
const profileEditBtn = profileInfo.querySelector(".profile__edit-button");
const cardAddBtn = profileInfo.querySelector(".profile__add-button")

// попап профиля
const profilePopupSelector = document.querySelector("#profile-popup");
const nameInput = profilePopupSelector.querySelector(".popup__text_type_name");
const jobInput = profilePopupSelector.querySelector(".popup__text_type_profession");

// попап формы карточки
const cardPopupSelector = document.querySelector("#card-popup");
const titleInput = cardPopupSelector.querySelector(".popup__text_type_title");
const linkInput = cardPopupSelector.querySelector(".popup__text_type_image-link");

const userInfo = new UserInfo({nameSelector: ".profile__name-value", aboutSelector: ".profile__profession"});

const profilePopup = new PopupWithForm("#profile-popup", submitProfileForm);
profilePopup.setEventListeners();

function submitProfileForm(data) {
  userInfo.setUserInfo(data)
  profilePopup.close();
}

function openProfilePopup() {
  const infoData = userInfo.getUserInfo();
  nameInput.value = infoData.name;
  jobInput.value = infoData.about;
  profileValidator.clearValidationErrors();
  profilePopup.open();
}

const photoPopup = new PopupWithImage("#photo-popup");
photoPopup.setEventListeners();

const section = new Section({'items': initialCards, 'renderer': createCard}, gallery)
section.renderElements();

const cardPopup = new PopupWithForm("#card-popup", submitCardForm);
cardPopup.setEventListeners();

function submitCardForm(data) {
  section.addItem(data);
  cardPopup.close();
}

// добавление валидации форм
const cardValidator = new FormValidator({ inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}, cardPopupSelector);
cardValidator.enableValidation();

const profileValidator = new FormValidator({ inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}, profilePopupSelector);
profileValidator.enableValidation();


function openCardPopup() {
  titleInput.value = "";
  linkInput.value = "";
  cardValidator.clearValidationErrors();
  cardPopup.open();
}

function createCard(data) {
  const card = new Card(data, cardSelector, photoPopup.open.bind(photoPopup)).generateCard();
  return card;
}

// обработчики кнопок профиля
cardAddBtn.addEventListener("click", () => {
  openCardPopup();
});

profileEditBtn.addEventListener("click", () => {
  openProfilePopup();
});
