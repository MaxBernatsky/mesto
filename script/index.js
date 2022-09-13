let popup = document.querySelector('.popup');
let editBtn = document.querySelector('.profile__btn-edit');
let closeBtn = document.querySelector('.popup__close');

let formElement = document.querySelector('.popup__form');
let inputName = formElement.querySelector('.popup__name');
let inputProfiession = formElement.querySelector('.popup__profession');
let popupBtn = formElement.querySelector('.popup__button');

editBtn.addEventListener('click', function () {
  popup.classList.add('popup_opened');
});

closeBtn.addEventListener('click', function () {
  popup.classList.remove('popup_opened');
});

popupBtn.addEventListener('click', function () {
  popup.classList.remove('popup_opened');
});

function formSubmitHandler(evt) {
  evt.preventDefault();

  let profileTitle = document.querySelector('.profile__title');
  let profileSubtitle = document.querySelector('.profile__subtitle');

  profileTitle.textContent = inputName.value;
  profileSubtitle.textContent = inputProfiession.value;
}

formElement.addEventListener('submit', formSubmitHandler);
