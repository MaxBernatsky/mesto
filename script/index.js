import { initialCards, settings } from './settings.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { Section } from './Section.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';

// Profile Elements
const editBtn = document.querySelector('.profile__btn-edit');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

// Popup Elements
const popupList = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('#popup-profile');
const popupProfileForm = popupProfile.querySelector('.popup__form');
const closeProfileBtn = popupProfile.querySelector('.popup__close');
const inputName = popupProfile.querySelector('.popup__input_item_name');
const inputProfession = popupProfile.querySelector('.popup__input_item_descr');

// Popup-place Elements
const popupAddBtn = document.querySelector('.profile__btn-add');
const popupPlace = document.querySelector('#popup-place');
const popupPlaceForm = popupPlace.querySelector('.popup__form');
const popupPlaceCloseBtn = popupPlace.querySelector('.popup__close');
const popupPlaceName = popupPlace.querySelector('.popup__input_item_name');
const popupPlaceLink = popupPlace.querySelector('.popup__input_item_descr');

const profileFormValidation = new FormValidator(settings, popupProfileForm);
profileFormValidation.enableValidation();

const placeFormValidation = new FormValidator(settings, popupPlaceForm);
placeFormValidation.enableValidation();

const cardList = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      cardList.addItem(createNewPlace(data));
    },
  },
  '.places'
);

const popupFullImg = new PopupWithImage('#popup-img');
popupFullImg.setEventListeners();

const handlePlaceFormSubmit = (evt, data) => {
  evt.preventDefault();
  createNewPlace(data);
  const newPlace = createNewPlace(data);
  cardList.addItem(newPlace);
  popupPlaceForm.reset();
  popupAddPlace.close();
};

const popupAddPlace = new PopupWithForm('#popup-place', handlePlaceFormSubmit);
popupAddPlace.setEventListeners();

const handlePlaceClick = (name, link) => {
  popupFullImg.open(name, link);
};

const createNewPlace = (data) => {
  return new Card(data, '#place-template', handlePlaceClick).generateCard();
};

editBtn.addEventListener('click', () => {
  openPopup(popupProfile);
  inputName.value = profileTitle.textContent;
  inputProfession.value = profileSubtitle.textContent;
  profileFormValidation.resetValidation();
});

popupAddBtn.addEventListener('click', () => {
  popupAddPlace.open();
  placeFormValidation.resetValidation();
});

cardList.renderItems();
