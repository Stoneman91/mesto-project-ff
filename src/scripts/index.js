import '../pages/index.css';
import { initialCards } from './cards.js';

const cardTemplate = document.querySelector('#card-template').content; 
const cardsContainer = document.querySelector('.places__list'); 
 
function createCard(cardData, removeCard) { 
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true); 
    const cardImage = cardElement.querySelector('.card__image'); 
    const cardTitle = cardElement.querySelector('.card__title'); 
    cardImage.src = cardData.link; 
    cardImage.alt = cardData.name; 
    cardTitle.textContent = cardData.name;
 
    //Обработчик удаления карточки  
 
    const deleteButton = cardElement.querySelector('.card__delete-button'); 
    deleteButton.addEventListener('click', () => { 
        removeCard(cardElement); 
    }); 
    return cardElement; 
} 
 
// Удаление карточки  
 
function deleteCard(cardElement) { 
    cardElement.remove(); 
} 
 
// Вывод карточки  

initialCards.forEach((cardData) => { 
    const cardElement = createCard(cardData, deleteCard); 
    cardsContainer.append(cardElement);
})
