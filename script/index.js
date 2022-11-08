const settings = {
  popupSelector: '.popup',
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
};

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
const popupPlaceBtnCreate = popupPlace.querySelector('.popup__button');

//Popup-img Elements
const popupImg = document.querySelector('#popup-img');
const popupImgCloseBtn = popupImg.querySelector('.popup__close');
const popupImgFull = popupImg.querySelector('.popup__img');
const popupImgDescr = popupImg.querySelector('.popup__descr');

//Template
const placeTemplate = document.querySelector('#place-template').content;
const container = document.querySelector('.places');

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
};

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
};

const handleFormSubmit = (evt) => {
  evt.preventDefault();
  profileTitle.textContent = inputName.value;
  profileSubtitle.textContent = inputProfession.value;

  closePopup(popupProfile);
};

const handlePlaceFormSubmit = (evt) => {
  evt.preventDefault();
  addNewPlace();
  popupPlaceForm.reset();
  closePopup(popupPlace);
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

//   placeImg.addEventListener('click', () => {
//     openPopup(popupImg);
//     popupImgFull.src = link;
//     popupImgFull.alt = name;
//     popupImgDescr.textContent = name;
//   });

// const addNewPlace = () => {
//   const newPlace = createItemNode(popupPlaceName.value, popupPlaceLink.value);
//   container.prepend(newPlace);
// };

popupProfileForm.addEventListener('submit', handleFormSubmit);

popupPlaceForm.addEventListener('submit', handlePlaceFormSubmit);

editBtn.addEventListener('click', () => {
  openPopup(popupProfile);
  inputName.value = profileTitle.textContent;
  inputProfession.value = profileSubtitle.textContent;
  clearErrorMessage(popupProfile, settings);
});

closeProfileBtn.addEventListener('click', () => {
  closePopup(popupProfile);
});

popupAddBtn.addEventListener('click', () => {
  openPopup(popupPlace);
  clearErrorMessage(popupPlace, settings);
});

popupPlaceCloseBtn.addEventListener('click', () => {
  closePopup(popupPlace);
});

popupImgCloseBtn.addEventListener('click', () => {
  closePopup(popupImg);
});

enableValidation(settings);
