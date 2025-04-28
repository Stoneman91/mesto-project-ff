import '../pages/index.css';
import { initialCards } from './cards.js';
import { createCard, deleteCard } from "../components/card.js";
import { closeModal, openModal } from "../components/modal.js";

const cardsContainer = document.querySelector('.places__list'); 
const popupEdit = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const formElement = document.querySelector('.popup_type_edit');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');
const addCardForm = document.querySelector('.popup_type_new-card .popup__form');
const cardNameInput = addCardForm.querySelector('.popup__input_type_card-name');
const cardLinkInput = addCardForm.querySelector('.popup__input_type_url');

function handlePopupImage(cardData) {
    popupImage.src = cardData.link;
    popupImage.alt = cardData.name;
    popupCaption.textContent = cardData.name;
    openModal(popupTypeImage);
}

initialCards.forEach((cardData) => { 
    const cardElement = createCard(cardData, deleteCard, handlePopupImage); 
    cardsContainer.append(cardElement);
})

function handleAddCard() {
    addCardForm.reset();
    openModal(popupAddCard);
}

editButton.addEventListener('click', () => openModal(popupEdit));
addButton.addEventListener('click', () => handleAddCard());



function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closeModal(popupEdit);
}
formElement.addEventListener('submit', handleFormSubmit); 

function handleAddCardSubmit(evt) {
    evt.preventDefault();
    
    const newCardData = {
        name: cardNameInput.value,
        link: cardLinkInput.value
    };
    const newCard = createCard(newCardData, deleteCard, handlePopupImage);
    cardsContainer.prepend(newCard);
    addCardForm.reset();
    closeModal(popupAddCard);
}
addCardForm.addEventListener('submit', handleAddCardSubmit);

