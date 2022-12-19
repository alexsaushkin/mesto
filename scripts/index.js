const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// карточка
const cardTemplateElement = document.querySelector("#gallery-element").content.querySelector(".gallery__element");
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

// попап картинки
const photoPopup = document.querySelector("#photo-popup");
const imageElement = photoPopup.querySelector(".popup__image");
const captionElement = photoPopup.querySelector(".popup__caption");
const closePhotoPopupBtn = photoPopup.querySelector(".popup__close-btn");

// попап формы карточки
const cardPopup = document.querySelector("#card-popup");
const titleInput = cardPopup.querySelector(".popup__text_type_title");
const linkInput = cardPopup.querySelector(".popup__text_type_image-link");
const closeCardPopupBtn = cardPopup.querySelector(".popup__close-btn");

function likeCard(element) {
  element.target.classList.toggle("gallery__like_active");
}

function deleteCard(element) {
  element.target.closest(".gallery__element").remove();
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

function findOpenedPopup() {
  return document.querySelector('.popup_opened');
}

function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    const popupOpened = findOpenedPopup();
    closePopup(popupOpened);
    document.removeEventListener('keydown', closePopupEsc);
  }
}

function closePopupOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    const popupOpened = findOpenedPopup();
    closePopup(popupOpened);
    popupOpened.removeEventListener('click', closePopupOverlay);
  }
}

function handleEscClose() {
  document.addEventListener('keydown', closePopupEsc);
}

function handleOverlayClose() {
  const popupOpened = document.querySelector('.popup_opened');
  const overlay = popupOpened.closest('.popup');
  overlay.addEventListener('click', closePopupOverlay)
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
  handleEscClose();
  handleOverlayClose();
  // валидация после открытия попапа
  const inputList = Array.from(popup.querySelectorAll(settingsObj.inputSelector));
  const buttonElement = popup.querySelector(settingsObj.submitButtonSelector);
  toggleButtonState(settingsObj, inputList, buttonElement);
}

function updateProfile(name, profession) {
  profileName.textContent = name;
  profileProfession.textContent = profession;
}

function submitProfileForm(evt) {
  evt.preventDefault();
  updateProfile(nameInput.value, jobInput.value);
  closePopup(profilePopup);
}

function openProfilePopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileProfession.textContent;
  openPopup(profilePopup);
}

function openPhotoPopup(element) {
  imageElement.src = element.target.src;
  imageElement.alt = element.target.alt;
  captionElement.textContent = element.target.alt;
  openPopup(photoPopup);
}

function createCard(name, link) {
  const cardElement = cardTemplateElement.cloneNode(true);
  const cardPhotoElement = cardElement.querySelector(".gallery__photo");
  const cardLikeBtn = cardElement.querySelector(".gallery__like");
  const cardDeleteBtn = cardElement.querySelector(".gallery__delete");

  cardPhotoElement.src = link;
  cardPhotoElement.alt = name;
  cardElement.querySelector(".gallery__title").textContent = name;

  cardLikeBtn.addEventListener("click", likeCard);
  cardDeleteBtn.addEventListener("click", deleteCard);
  cardPhotoElement.addEventListener("click", openPhotoPopup);

  return cardElement;
}

function openCardPopup() {
  titleInput.value = "";
  linkInput.value = "";
  openPopup(cardPopup);
}

function submitCardForm(evt) {
  evt.preventDefault();
  const card = createCard(titleInput.value, linkInput.value);
  gallery.prepend(card);
  closePopup(cardPopup);
}

// добавление начальных карточек
initialCards.forEach(function (item) {
  const card = createCard(item.name, item.link);
  gallery.append(card);
});

// обработчики кнопок профиля
cardAddBtn.addEventListener("click", openCardPopup);
profileEditBtn.addEventListener("click", openProfilePopup);

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
