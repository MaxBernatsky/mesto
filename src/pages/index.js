import './index.css';

import { settings } from '../utils/settings.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';
import { PopupConfirm } from '../components/PopupConfirm.js';
import {
  popupProfile,
  editBtn,
  editAvatarBtn,
  popupProfileForm,
  popupPlace,
  popupPlaceForm,
  popupChangeImg,
  popupChangeImgForm,
  profileName,
  profileProfession,
  popupAddBtn,
} from '../utils/variables.js';

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

Promise.all([api.getUserProfile(), api.getInitialCards()])
  .then(([userData, cardsData]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData.name, userData.about, userData.avatar);
    section.renderItems(cardsData);
  })
  .catch((error) => {
    console.log(error);
  });

let userId;

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
    renderer: (data) => {
      const newPlace = createNewPlace(data);
      section.addInitialItems(newPlace);
    },
  },
  '.places'
);

const popupFullImg = new PopupWithImage('#popup-img');

const popupAddPlace = new PopupWithForm('#popup-place', handlePlaceFormSubmit);

const popupConfirm = new PopupConfirm('#popup-confirm');

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
