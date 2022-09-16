let editBtn = document.querySelector('.profile__btn-edit');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

let popup = document.querySelector('.popup');
let closeBtn = popup.querySelector('.popup__close');
let inputName = popup.querySelector('.popup__name');
let inputProfession = popup.querySelector('.popup__profession');
let popupBtn = popup.querySelector('.popup__button');

function popupToggle() {
  popup.classList.toggle('popup_opened');
}
editBtn.addEventListener('click', popupToggle);

closeBtn.addEventListener('click', popupToggle);

popupBtn.addEventListener('click', popupToggle);

function formSubmitHandler(evt) {
  evt.preventDefault();

  profileTitle.textContent = inputName.value;
  profileSubtitle.textContent = inputProfession.value;
}

popup.addEventListener('submit', formSubmitHandler);
