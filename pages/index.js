let profileInfo = document.querySelector('.profile__info');
let profileEditBtn = profileInfo.querySelector('.profile__edit-button');
let profileName = profileInfo.querySelector('.profile__name-value');
let profileProfession = profileInfo.querySelector('.profile__profession');

let formElement = document.querySelector('.popup');
let closeBtn = formElement.querySelector('.popup__close-btn');
let nameInput = formElement.querySelector('.popup__text_type_name');
let jobInput = formElement.querySelector('.popup__text_type_profession');

function handleFormOpen () {
    if (!formElement.classList.contains('popup_opened')) {
        formElement.classList.add('popup_opened');
        nameInput.value = profileName.textContent;
        jobInput.value = profileProfession.textContent;
    }
}

function handleFormClose () {
    if (formElement.classList.contains('popup_opened')) {
        formElement.classList.remove('popup_opened');
    }
}


function handleFormSubmit (evt) {
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