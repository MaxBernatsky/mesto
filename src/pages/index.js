import './index.css';

import { initialCards, settings } from '../utils/settings.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';

// Profile Elements
const popupProfile = document.querySelector('#popup-profile');
const editBtn = document.querySelector('.profile__btn-edit');
const popupProfileForm = popupProfile.querySelector('.popup__form');
const profileName = popupProfileForm.querySelector('.popup__input_item_name');
const profileProfession = popupProfileForm.querySelector(
  '.popup__input_item_descr'
);
const popupAddBtn = document.querySelector('.profile__btn-add');

//Profile Validation
const profileFormValidation = new FormValidator(settings, popupProfileForm);
profileFormValidation.enableValidation();

//Place Validation
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

const popupAddPlace = new PopupWithForm('#popup-place', handlePlaceFormSubmit);
popupAddPlace.setEventListeners();

function handlePlaceFormSubmit(evt, data) {
  evt.preventDefault();
  createNewPlace(data);
  const newPlace = createNewPlace(data);
  cardList.addItem(newPlace);
  popupPlaceForm.reset();
  popupAddPlace.close();
}

const handlePlaceClick = (name, link) => {
  popupFullImg.open(name, link);
};

const createNewPlace = (data) => {
  return new Card(data, '#place-template', handlePlaceClick).generateCard();
};

const userInfo = new UserInfo('.profile__title', '.profile__subtitle');

const popupUserProfile = new PopupWithForm(
  '#popup-profile',
  handleProfileFormSubmit
);

function handleProfileFormSubmit(evt, data) {
  evt.preventDefault();
  userInfo.setUserInfo(data);
  popupUserProfile.close();
}

popupUserProfile.setEventListeners();

editBtn.addEventListener('click', () => {
  popupUserProfile.open();
  const profileInfo = userInfo.getUserInfo();
  profileName.value = profileInfo.userName;
  profileProfession.value = profileInfo.userDescription;
  profileFormValidation.resetValidation();
});

popupAddBtn.addEventListener('click', () => {
  popupAddPlace.open();
  placeFormValidation.resetValidation();
});

cardList.renderItems();
