import '../pages/index.css';
import { initialCards } from './cards.js';
import { createCard, deleteCard } from "../components/card.js";
import { closeModal, openModal } from "../components/modal.js";

const cardsContainer = document.querySelector('.places__list'); 
const popupEdit = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup_image');
const popupCaption = document.querySelector('.popup__caption');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const addForm = document.querySelector('.popup_type_new-card .popup__form');

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

editButton.addEventListener('click', () => openModal(popupEdit));
addButton.addEventListener('click', () => {
  addForm.reset();
  openModal(popupAddCard);
});
