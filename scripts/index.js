import { initialCards } from "./data.js";
import { settingsObj } from "./settings.js";
import { photoPopup, closePhotoPopupBtn, Card } from "./card.js";
import { closePopup, openPopup } from "./popup.js";
import { FormValidator } from "./formvalidator.js";


// карточка
const cardSelector = "#gallery-element";
const gallery = document.querySelector(".gallery__items");

// профиль
const profileInfo = document.querySelector(".profile");
const profileEditBtn = profileInfo.querySelector(".profile__edit-button");
const cardAddBtn = profileInfo.querySelector(".profile__add-button")
const profileName = profileInfo.querySelector(".profile__name-value");
const profileProfession = profileInfo.querySelector(".profile__profession");

// попап профиля
const profilePopup = document.querySelector("#profile-popup");
const nameInput = profilePopup.querySelector(".popup__text_type_name");
const jobInput = profilePopup.querySelector(".popup__text_type_profession");
const closeProfilePopupBtn = profilePopup.querySelector(".popup__close-btn");

// попап формы карточки
const cardPopup = document.querySelector("#card-popup");
const titleInput = cardPopup.querySelector(".popup__text_type_title");
const linkInput = cardPopup.querySelector(".popup__text_type_image-link");
const closeCardPopupBtn = cardPopup.querySelector(".popup__close-btn");

function updateProfile(name, profession) {
  profileName.textContent = name;
  profileProfession.textContent = profession;
}

function submitProfileForm(evt) {
  evt.preventDefault();
  updateProfile(nameInput.value, jobInput.value);
  closePopup(profilePopup);
}

function openProfilePopup(validator) {
  nameInput.value = profileName.textContent;
  jobInput.value = profileProfession.textContent;
  validator.clearValidationErrors();
  openPopup(profilePopup);
}

function openCardPopup(validator) {
  titleInput.value = "";
  linkInput.value = "";
  validator.clearValidationErrors();
  openPopup(cardPopup);
}

function submitCardForm(evt) {
  evt.preventDefault();
  const card = new Card({name: titleInput.value, link: linkInput.value}, cardSelector);
  gallery.prepend(card.generateCard());
  closePopup(cardPopup);
}

// добавление валидации форм
const cardValidator = new FormValidator(settingsObj, cardPopup);
cardValidator.enableValidation();

const profileValidator = new FormValidator(settingsObj, profilePopup);
profileValidator.enableValidation();

// добавление начальных карточек
initialCards.forEach(function (item) {
  const card = new Card({name: item.name, link: item.link}, cardSelector);
  gallery.append(card.generateCard());
});

// обработчики кнопок профиля
cardAddBtn.addEventListener("click", () => {
  openCardPopup(cardValidator);
});
profileEditBtn.addEventListener("click", () => {
  openProfilePopup(profileValidator);
});

// обработчики событий попапа профиля
profilePopup.addEventListener("submit", submitProfileForm);
closeProfilePopupBtn.addEventListener("click", function () {
  closePopup(profilePopup);
});

// обработчики закрытия попапа картинки
closePhotoPopupBtn.addEventListener("click", function () {
  closePopup(photoPopup);
});

// обработчик событий попапа карточки
cardPopup.addEventListener("submit", submitCardForm);
closeCardPopupBtn.addEventListener("click", function () {
  closePopup(cardPopup);
});
