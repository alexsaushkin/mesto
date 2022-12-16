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

function addElement(element, container) {
    container.append(element);
}

function likeCard(element) {
    element.target.classList.toggle('gallery__like_active');
}

function deleteCard(element) {
    element.target.closest('.gallery__element').remove();
}

function createCard(name, link) {
    // клонируем содержимое тега template для карточки
    const cardElement = cardTemplate.querySelector('.gallery__element').cloneNode(true);

    // наполняем содержимым
    const cardPhotoElement = cardElement.querySelector('.gallery__photo');
    const cardLikeBtn = cardElement.querySelector('.gallery__like');
    const cardDeleteBtn = cardElement.querySelector('.gallery__delete');

    cardPhotoElement.src = link;
    cardPhotoElement.alt = name;
    cardElement.ariaLabel = name;
    cardElement.querySelector('.gallery__title').textContent = name;

    cardLikeBtn.addEventListener('click', likeCard);
    cardDeleteBtn.addEventListener('click', deleteCard);

    return cardElement;
}

initialCards.forEach(function (item) {
    const card = createCard(item.name, item.link);
    addElement(card, gallery);
});

let profileInfo = document.querySelector('.profile__info');
let profileEditBtn = profileInfo.querySelector('.profile__edit-button');
let profileName = profileInfo.querySelector('.profile__name-value');
let profileProfession = profileInfo.querySelector('.profile__profession');

// let formElement = document.querySelector('.popup');
// let closeBtn = formElement.querySelector('.popup__close-btn');

const page = document.querySelector('.page');
const profilePopupTemplate = document.querySelector('#profile-popup').content;
const cardPopupTemplate = document.querySelector('#card-popup').content;
const photoPopupTemplate = document.querySelector('#photo-popup').content;

function createPopup(popupTemplate) {
    return popupTemplate.querySelector('.popup').cloneNode(true);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    setTimeout(() => {
        popup.remove();
    }, 700);
}

function createProfilePopup() {
    const popup = createPopup(profilePopupTemplate);
    const nameInput = popup.querySelector('.popup__text_type_name');
    const jobInput = popup.querySelector('.popup__text_type_profession');
    nameInput.value = profileName.textContent;
    jobInput.value = profileProfession.textContent;

    let closeBtn = popup.querySelector('.popup__close-btn');
    closeBtn.addEventListener('click', function () {
        closePopup(popup);
    });
    addElement(popup, page);
    setTimeout(() => {
        popup.classList.add('popup_opened');
    }, 100);
}


// function handleFormOpen() {
//     if (!formElement.classList.contains('popup_opened')) {
//         formElement.classList.add('popup_opened');
//         nameInput.value = profileName.textContent;
//         jobInput.value = profileProfession.textContent;
//     }
// }

// function handleFormClose() {
//     if (formElement.classList.contains('popup_opened')) {
//         formElement.classList.remove('popup_opened');
//     }
// }


// function handleFormSubmit(evt) {
//     evt.preventDefault();
//     profileName.textContent = `${nameInput.value}`;
//     profileProfession.textContent = `${jobInput.value}`;
//     handleFormClose();
// }

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
profileEditBtn.addEventListener('click', createProfilePopup);

// formElement.addEventListener('submit', handleFormSubmit);