let editBtn = document.querySelector('.profile__btn-edit');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

let popup = document.querySelector('.popup');
let popupForm = document.querySelector('.popup__form');
let closeBtn = document.querySelector('.popup__close');
let inputName = document.querySelector('.popup__name');
let inputProfession = document.querySelector('.popup__profession');

function popupOpen() {
  popup.classList.add('popup_opened');
  if (popup.classList.contains('popup_opened')) {
    inputName.value = profileTitle.textContent;
    inputProfession.value = profileSubtitle.textContent;
  }
}

function popupClose() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileTitle.textContent = inputName.value;
  profileSubtitle.textContent = inputProfession.value;

  popupClose();
}

popupForm.addEventListener('submit', formSubmitHandler);

editBtn.addEventListener('click', popupOpen);

closeBtn.addEventListener('click', popupClose);
