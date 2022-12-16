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
const editAvatarBtn = document.querySelector('.profile__img-edit');
const popupProfileForm = popupProfile.querySelector('.popup__form');
const popupPlace = document.querySelector('#popup-place');
const popupPlaceForm = popupPlace.querySelector('.popup__form');
const popupChangeImg = document.querySelector('#popup-change');
const popupChangeImgForm = popupChangeImg.querySelector('.popup__form');
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

//Change Avatar Validation
const profileAvatarFormValidation = new FormValidator(
  settings,
  popupChangeImgForm
);
profileAvatarFormValidation.enableValidation();

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-55',
  headers: {
    authorization: '6c949aed-4b63-42da-a8c1-da85f6e57885',
    'Content-Type': 'application/json',
  },
});

api.getUserProfile().then((result) => {
  userInfo.setUserInfo(result.name, result.about, result.avatar);
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
  popupUserProfile.checkLoading(true, 'Сохранение...');
  api
    .editUserProfile(data)
    .then((result) => {
      userInfo.setUserInfo(result.name, result.about, result.avatar);
      popupUserProfile.close();
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      popupUserProfile.checkLoading(false);
    });
};

const handleAvatarFormSubmit = (data) => {
  popupChangeAvatar.checkLoading(true, 'Сохранение...');
  api
    .editAvatar(data)
    .then(() => {
      userInfo.setUserAvatar(data);
      popupChangeAvatar.close();
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      popupChangeAvatar.checkLoading(false);
    });
};

editAvatarBtn.addEventListener('click', () => {
  popupChangeAvatar.open();
  profileAvatarFormValidation.resetValidation();
});

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
  popupAddPlace.checkLoading(true, 'Сохранение...');
  api
    .addCard(data)
    .then((result) => {
      const newCard = createNewPlace(result);
      section.addItem(newCard);
      popupAddPlace.close();
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      popupAddPlace.checkLoading(false);
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
    (id) => {
      if (card.isLiked()) {
        api.deleteLike(id).then((result) => {
          card.setLikes(result.likes);
        });
      } else {
        api.addLike(id).then((result) => {
          card.setLikes(result.likes);
        });
      }
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

const popupChangeAvatar = new PopupWithForm(
  '#popup-change',
  handleAvatarFormSubmit
);

const userInfo = new UserInfo(
  '.profile__title',
  '.profile__subtitle',
  '.profile__img'
);

const popupUserProfile = new PopupWithForm(
  '#popup-profile',
  handleProfileFormSubmit
);
popupUserProfile.setEventListeners();
popupFullImg.setEventListeners();
popupAddPlace.setEventListeners();
popupConfirm.setEventListeners();
popupChangeAvatar.setEventListeners();
