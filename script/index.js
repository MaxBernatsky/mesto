import { initialCards, settings } from './settings.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { Section } from './Section.js';

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

//Popup-img Elements
const popupImg = document.querySelector('#popup-img');
const popupImgCloseBtn = popupImg.querySelector('.popup__close');
const popupImgFull = popupImg.querySelector('.popup__img');
const popupImgDescr = popupImg.querySelector('.popup__descr');

//Template
const container = document.querySelector('.places');

//Validation

const profileFormValidation = new FormValidator(settings, popupProfileForm);
profileFormValidation.enableValidation();

const placeFormValidation = new FormValidator(settings, popupPlaceForm);
placeFormValidation.enableValidation();

const cardList = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const createPlace = new Card(data, '#place-template', openCardPlace);
      const newPlaceElement = createPlace.generateCard();
      cardList.addItem(newPlaceElement);
    },
  },
  '.container'
);

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
};

const openCardPlace = (name, link) => {
  popupImgDescr.textContent = name;
  popupImgFull.alt = name;
  popupImgFull.src = link;
  openPopup(popupImg);
};

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
};

const closeWithClickOnOverlay = () => {
  popupList.forEach((popupItem) => {
    popupItem.addEventListener('mousedown', (e) => {
      if (e.target.classList.contains('popup__container')) {
        closePopup(popupItem);
      }
    });
  });
};
closeWithClickOnOverlay();

const closePopupEsc = (event) => {
  if (event.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
};

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  profileTitle.textContent = inputName.value;
  profileSubtitle.textContent = inputProfession.value;

  closePopup(popupProfile);
};

const createNewPlace = (data) => {
  const createPlace = new Card(data, '#place-template', openCardPlace);
  const newPlaceElement = createPlace.generateCard();
  return newPlaceElement;
};

const handlePlaceFormSubmit = (evt) => {
  evt.preventDefault();
  const newPlaceValue = {
    name: popupPlaceName.value,
    link: popupPlaceLink.value,
  };
  const newPlace = createNewPlace(newPlaceValue);
  container.prepend(newPlace);
  popupPlaceForm.reset();
  closePopup(popupPlace);
};

popupProfileForm.addEventListener('submit', handleProfileFormSubmit);

popupPlaceForm.addEventListener('submit', handlePlaceFormSubmit);

editBtn.addEventListener('click', () => {
  openPopup(popupProfile);
  inputName.value = profileTitle.textContent;
  inputProfession.value = profileSubtitle.textContent;
  profileFormValidation.resetValidation();
});

closeProfileBtn.addEventListener('click', () => {
  closePopup(popupProfile);
});

popupAddBtn.addEventListener('click', () => {
  openPopup(popupPlace);
  placeFormValidation.resetValidation();
});

popupPlaceCloseBtn.addEventListener('click', () => {
  closePopup(popupPlace);
});

popupImgCloseBtn.addEventListener('click', () => {
  closePopup(popupImg);
});

initialCards.forEach((item) => {
  const defaultCardElement = createNewPlace(item);
  container.append(defaultCardElement);
});
