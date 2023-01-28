import { initialCards } from "./data.js";
import { settingsObj } from "./settings.js";
import { Card } from "./Card.js";
import { closePopup, openPopup, photoPopup, buttonClosePhotoPopup, closePopupOverlay } from "./popup.js";
import { FormValidator } from "./FormValidator.js";


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
const buttonCloseProfilePopup = profilePopup.querySelector(".popup__close-btn");

// попап формы карточки
const cardPopup = document.querySelector("#card-popup");
const titleInput = cardPopup.querySelector(".popup__text_type_title");
const linkInput = cardPopup.querySelector(".popup__text_type_image-link");
const buttonCloseCardPopup = cardPopup.querySelector(".popup__close-btn");

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

function createCard(data, cardSelector) {
  const card = new Card(data, cardSelector).generateCard();
  return card;
}

function prependNewCard(data, cardSelector, where) {
  const card = createCard(data, cardSelector);
  where.prepend(card);
}

function appendNewCard(data, cardSelector, where) {
  const card = createCard(data, cardSelector);
  where.append(card);
}

function submitCardForm(evt) {
  evt.preventDefault();
  prependNewCard({name: titleInput.value, link: linkInput.value}, cardSelector, gallery);
  closePopup(cardPopup);
}

// добавление валидации форм
const cardValidator = new FormValidator(settingsObj, cardPopup);
cardValidator.enableValidation();

const profileValidator = new FormValidator(settingsObj, profilePopup);
profileValidator.enableValidation();

// добавление начальных карточек
initialCards.forEach(function (item) {
  appendNewCard({name: item.name, link: item.link}, cardSelector, gallery);
});

// обработчики кнопок профиля
cardAddBtn.addEventListener("click", () => {
  openCardPopup(cardValidator);
});
profileEditBtn.addEventListener("click", () => {
  openProfilePopup(profileValidator);
});

const popups = Array.from(document.querySelectorAll('.popup'))
popups.forEach((popup) => {
    popup.addEventListener('click', closePopupOverlay)
})

// обработчики событий попапа профиля
profilePopup.addEventListener("submit", submitProfileForm);
buttonCloseProfilePopup.addEventListener("click", function () {
  closePopup(profilePopup);
});

// обработчики закрытия попапа картинки
buttonClosePhotoPopup.addEventListener("click", function () {
  closePopup(photoPopup);
});

// обработчик событий попапа карточки
cardPopup.addEventListener("submit", submitCardForm);
buttonCloseCardPopup.addEventListener("click", function () {
  closePopup(cardPopup);
});
