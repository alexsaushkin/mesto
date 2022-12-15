const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const cardTemplate = document.querySelector('#gallery-element').content;
const gallery = document.querySelector('.gallery');

initialCards.forEach(function (item) {
    const card = createCard(item.name, item.link);
    addCard(card, gallery);
});

function createCard(name, link) {
    // клонируем содержимое тега template для карточки
    const cardElement = cardTemplate.querySelector('.gallery__element').cloneNode(true);

    // наполняем содержимым
    const cardPhotoElement = cardElement.querySelector('.gallery__photo');
    cardPhotoElement.src = link;
    cardPhotoElement.alt = name;
    cardElement.ariaLabel = name;
    cardElement.querySelector('.gallery__title').textContent = name;
    return cardElement;
}

function addCard(element, gallery) {
    // отображаем на странице
    gallery.append(element);
}


let profileInfo = document.querySelector('.profile__info');
let profileEditBtn = profileInfo.querySelector('.profile__edit-button');
let profileName = profileInfo.querySelector('.profile__name-value');
let profileProfession = profileInfo.querySelector('.profile__profession');

let formElement = document.querySelector('.popup');
let closeBtn = formElement.querySelector('.popup__close-btn');
let nameInput = formElement.querySelector('.popup__text_type_name');
let jobInput = formElement.querySelector('.popup__text_type_profession');

function handleFormOpen() {
    if (!formElement.classList.contains('popup_opened')) {
        formElement.classList.add('popup_opened');
        nameInput.value = profileName.textContent;
        jobInput.value = profileProfession.textContent;
    }
}

function handleFormClose() {
    if (formElement.classList.contains('popup_opened')) {
        formElement.classList.remove('popup_opened');
    }
}


function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = `${nameInput.value}`;
    profileProfession.textContent = `${jobInput.value}`;
    handleFormClose();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
profileEditBtn.addEventListener('click', handleFormOpen); 
closeBtn.addEventListener('click', handleFormClose);
formElement.addEventListener('submit', handleFormSubmit); 