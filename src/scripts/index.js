import '../pages/index.css';
import { initialCards } from './cards.js';

const cardTemplate = document.querySelector('#card-template').content; 
const cardsContainer = document.querySelector('.places__list'); 
const PopupEdit = document.querySelector('.popup_type_edit');
const PopupAddCard = document.querySelector('.popup_type_new-card');
const PopupTypeImage = document.querySelector('popup_type_image');
const PopupImage = document.querySelector('popup_image');
const PopupCaption = document.querySelector('popup_caption');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

initialCards.forEach((cardData) => { 
    const cardElement = createCard(cardData, deleteCard); 
    cardsContainer.append(cardElement);
})

function handleAddCard() {
    elements.addForm.reset();
    openModal(elements.PopupAddCard);
}