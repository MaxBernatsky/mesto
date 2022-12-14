import './index.css';

import { settings } from '../utils/settings.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';

// Profile Elements
const popupProfile = document.querySelector('#popup-profile');
const editBtn = document.querySelector('.profile__btn-edit');
const popupProfileForm = popupProfile.querySelector('.popup__form');
const popupPlace = document.querySelector('#popup-place');
const popupPlaceForm = popupPlace.querySelector('.popup__form');
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

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-55',
  headers: {
    authorization: '6c949aed-4b63-42da-a8c1-da85f6e57885',
    'Content-Type': 'application/json',
  },
});

api.getUserProfile().then((result) => {
  userInfo.setUserInfo(result.name, result.about);
  userId = result._id;
});

let userId;

api.getInitialCards().then((result) => {
  result.forEach((data) => {
    const newPlace = createNewPlace(data);
    section.addItem(newPlace);
  });
});

const handleProfileFormSubmit = (data) => {
  api.editUserProfile(data).then((result) => {
    userInfo.setUserInfo(result.name, result.about);
    popupUserProfile.close();
  });
};

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

const handlePlaceFormSubmit = (data) => {
  api.addCard(data).then((result) => {
    const newCard = createNewPlace(result);
    section.addItem(newCard);
    console.log(result);
    popupAddPlace.close();
  });
};

const createNewPlace = (data) => {
  const card = new Card(
    data,
    '#place-template',
    () => {
      popupFullImg.open(data.name, data.link);
    },
    (id) => {
      popupConfirm.open();
      popupConfirm.changeHandleFormSubmit(() => {
        api.deleteCard(id).then((result) => {
          card.deletePlace();
          popupConfirm.close();
        });
      });
    },
    userId
  );
  return card.generateCard();
};

const section = new Section(
  {
    items: [],
    renderer: createNewPlace,
  },
  '.places'
);

const popupFullImg = new PopupWithImage('#popup-img');

const popupAddPlace = new PopupWithForm('#popup-place', handlePlaceFormSubmit);

const popupConfirm = new PopupWithForm('#popup-confirm');

const userInfo = new UserInfo('.profile__title', '.profile__subtitle');

const popupUserProfile = new PopupWithForm(
  '#popup-profile',
  handleProfileFormSubmit
);
popupUserProfile.setEventListeners();
popupFullImg.setEventListeners();
popupAddPlace.setEventListeners();
popupConfirm.setEventListeners();
