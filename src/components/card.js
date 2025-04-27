const cardTemplate = document.querySelector('#card-template').content;
export function createCard(cardData, removeCard, handleCardClick) { 
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true); 
    const cardImage = cardElement.querySelector('.card__image'); 
    const cardTitle = cardElement.querySelector('.card__title'); 
    cardImage.src = cardData.link; 
    cardImage.alt = cardData.name; 
    cardTitle.textContent = cardData.name;
 
    const deleteButton = cardElement.querySelector('.card__delete-button'); 
    deleteButton.addEventListener('click', () => { 
        removeCard(cardElement); 
    }); 
    return cardElement; 
} 
export function deleteCard(cardElement) { 
    cardElement.remove(); 
} 