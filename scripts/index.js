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

const cardTemplate = document.querySelector("#gallery-element").content;
const gallery = document.querySelector(".gallery");
const profileInfo = document.querySelector(".profile");
const profileEditBtn = profileInfo.querySelector(".profile__edit-button");
const cardAddBtn = profileInfo.querySelector(".profile__add-button")
const profileName = profileInfo.querySelector(".profile__name-value");
const profileProfession = profileInfo.querySelector(".profile__profession");

function likeCard(element) {
  element.target.classList.toggle("gallery__like_active");
}

function deleteCard(element) {
  element.target.closest(".gallery__element").remove();
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

function updateProfile(name, profession) {
  profileName.textContent = name;
  profileProfession.textContent = profession;
}

function openProfilePopup() {
  const popup = document.querySelector("#profile-popup");
  const nameInput = popup.querySelector(".popup__text_type_name");
  const jobInput = popup.querySelector(".popup__text_type_profession");
  nameInput.value = profileName.textContent;
  jobInput.value = profileProfession.textContent;

  const closeBtn = popup.querySelector(".popup__close-btn");
  closeBtn.addEventListener("click", function () {
    closePopup(popup);
  });
  popup.addEventListener("submit", function (evt) {
    evt.preventDefault();
    updateProfile(nameInput.value, jobInput.value);
    closePopup(popup);
  });

  popup.classList.add("popup_opened");
}

function openPhotoPopup(element) {
  const popup = document.querySelector("#photo-popup");
  const imageElement = popup.querySelector(".popup__image");
  const captionElement = popup.querySelector(".popup__caption");
  const closeBtn = popup.querySelector(".popup__close-btn");

  imageElement.src = element.target.src;
  imageElement.alt = element.target.alt;
  captionElement.textContent = element.target.alt;

  closeBtn.addEventListener("click", function () {
    closePopup(popup);
  });

  popup.classList.add("popup_opened");
}

function createCard(name, link) {
  const cardElement = cardTemplate
    .querySelector(".gallery__element")
    .cloneNode(true);

  const cardPhotoElement = cardElement.querySelector(".gallery__photo");
  const cardLikeBtn = cardElement.querySelector(".gallery__like");
  const cardDeleteBtn = cardElement.querySelector(".gallery__delete");

  cardPhotoElement.src = link;
  cardPhotoElement.alt = name;
  cardElement.ariaLabel = name;
  cardElement.querySelector(".gallery__title").textContent = name;

  cardLikeBtn.addEventListener("click", likeCard);
  cardDeleteBtn.addEventListener("click", deleteCard);
  cardPhotoElement.addEventListener("click", openPhotoPopup);

  return cardElement;
}

function openCardPopup() {
  const popup = document.querySelector("#card-popup");
  const titleInput = popup.querySelector(".popup__text_type_title");
  const linkInput = popup.querySelector(".popup__text_type_image-link");
  const closeBtn = popup.querySelector(".popup__close-btn");
  closeBtn.addEventListener("click", function () {
    closePopup(popup);
  });

  popup.addEventListener("submit", function (evt) {
    evt.preventDefault();
    const card = createCard(titleInput.value, linkInput.value);
    gallery.prepend(card);
    closePopup(popup);
  });

  popup.classList.add("popup_opened");
}

initialCards.forEach(function (item) {
  const card = createCard(item.name, item.link);
  gallery.append(card);
});

profileEditBtn.addEventListener("click", openProfilePopup);
cardAddBtn.addEventListener("click", openCardPopup);
