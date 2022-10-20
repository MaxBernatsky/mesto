// Profile Elements
const editBtn = document.querySelector('.profile__btn-edit');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

// Popup Elements
const popupProfile = document.querySelector('#popup-profile');
const popupForm = popupProfile.querySelector('.popup__form');
const closeBtn = popupProfile.querySelector('.popup__close');
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
};

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
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

const render = () => {
  initialCards.forEach((item) => {
    const currentElement = createItemNode(item.name, item.link);
    container.append(currentElement);
  });
};

const createItemNode = (name, link) => {
  const placeElement = placeTemplate.querySelector('.place').cloneNode(true);
  const placeTitle = placeElement.querySelector('.place__title');
  const placeImg = placeElement.querySelector('.place__img');

  placeTitle.textContent = name;
  placeImg.src = link;
  placeImg.alt = name;

  const deleteBtn = placeElement.querySelector('.place__delete-btn');
  deleteBtn.addEventListener('click', deletePlace);

  const likeBtn = placeElement.querySelector('.place__like-btn');
  likeBtn.addEventListener('click', likePlace);

  placeImg.addEventListener('click', () => {
    openPopup(popupImg);
    if (popupImg.classList.contains('popup_opened')) {
      popupImgFull.src = link;
      popupImgFull.alt = name;
      popupImgDescr.textContent = name;
    }
  });

  return placeElement;
};
const addNewPlace = () => {
  const newPlace = createItemNode(popupPlaceName.value, popupPlaceLink.value);
  container.prepend(newPlace);
};

const likePlace = (evt) => {
  const currentLike = evt.target;
  currentLike.classList.toggle('place__like-btn_active');
};

const deletePlace = (evt) => {
  const currentEl = evt.target.closest('.place');
  currentEl.remove();
};

render();

popupForm.addEventListener('submit', handleFormSubmit);

popupPlaceForm.addEventListener('submit', handlePlaceFormSubmit);

editBtn.addEventListener('click', () => {
  openPopup(popupProfile);
  if (popupProfile.classList.contains('popup_opened')) {
    inputName.value = profileTitle.textContent;
    inputProfession.value = profileSubtitle.textContent;
  }
});

closeBtn.addEventListener('click', () => {
  closePopup(popupProfile);
});

popupAddBtn.addEventListener('click', () => {
  openPopup(popupPlace);
});

popupPlaceCloseBtn.addEventListener('click', () => {
  closePopup(popupPlace);
});

popupImgCloseBtn.addEventListener('click', () => {
  closePopup(popupImg);
});

//Validation

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
};

const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__button_inactive');
  } else {
    buttonElement.classList.remove('popup__button_inactive');
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (event) {
      event.preventDefault();
    });
    setEventListeners(formElement);
  });
};
enableValidation();
