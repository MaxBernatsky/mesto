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

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

const placeTemplate = document.querySelector('#place-template').content;
const container = document.querySelector('.places');

const render = () => {
  initialCards.forEach((item) => {
    const currentElement = createItemNode(item.name, item.link);
    container.append(currentElement);
  });
};

const createItemNode = (name, link) => {
  const placeElement = placeTemplate.querySelector('.place').cloneNode(true);
  placeElement.querySelector('.place__title').textContent = name;
  placeElement.querySelector('.place__img').src = link;

  return placeElement;
};

render();
