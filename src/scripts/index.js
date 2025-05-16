import '../pages/index.css';
import { initialCards } from './cards.js';
import { createCard, deleteCard, handleLikeClick } from "../components/card.js";
import { closeModal, openModal } from "../components/modal.js";
import { enableValidation, clearValidation, checkInputValidity, toggleButtonState} from "../components/validation.js";

const cardsContainer = document.querySelector('.places__list'); 
const popupEdit = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const profileEditForm = popupEdit.querySelector('.popup__form');
const nameInput = profileEditForm.querySelector('.popup__input_type_name');
const jobInput = profileEditForm.querySelector('.popup__input_type_description');
const addCardForm = document.querySelector('.popup_type_new-card .popup__form');
const cardNameInput = addCardForm.querySelector('.popup__input_type_card-name');
const cardLinkInput = addCardForm.querySelector('.popup__input_type_url');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

enableValidation(validationConfig);

function handlePopupImage(cardData) {
    popupImage.src = cardData.link;
    popupImage.alt = cardData.name; 
    popupCaption.textContent = cardData.name;
    clearValidation(addCardForm,validationConfig);
    openModal(popupTypeImage);
}

initialCards.forEach((cardData) => { 
    const cardElement = createCard(cardData, deleteCard, handlePopupImage, handleLikeClick); 
    cardsContainer.append(cardElement);
})

function handleAddCard() {
    addCardForm.reset();
    clearValidation(addCardForm, validationConfig);
    openModal(popupAddCard);
}
function fillProfileForm() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    setTimeout(() => {
        checkInputValidity(profileEditForm, nameInput, validationConfig);
        checkInputValidity(profileEditForm, jobInput, validationConfig);
        toggleButtonState(
          [nameInput, jobInput],
          profileEditForm.querySelector(validationConfig.submitButtonSelector),
          validationConfig
        );
      }, 0);
      clearValidation(profileEditForm, validationConfig);
      openModal(popupEdit);
    }
    
editButton.addEventListener('click', () => {
    fillProfileForm();
});
addButton.addEventListener('click', () => {
    handleAddCard();
  });
  
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    if (profileEditForm.checkValidity()) { 
        profileName.textContent = nameInput.value;
        profileJob.textContent = jobInput.value;
        closeModal(popupEdit);
      }
    }

profileEditForm.addEventListener('submit', handleProfileFormSubmit); 

function handleAddCardSubmit(evt) {
    evt.preventDefault();
    const newCardData = {
        name: cardNameInput.value,
        link: cardLinkInput.value
    };
    const newCard = createCard(newCardData, deleteCard, handlePopupImage, handleLikeClick);
    cardsContainer.prepend(newCard);
    addCardForm.reset();
    closeModal(popupAddCard);
}

addCardForm.addEventListener('submit', handleAddCardSubmit);


