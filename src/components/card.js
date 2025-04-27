const cardTemplate = document.querySelector('#card-template').content;
export function createCard(cardData, removeCard, handlerImage) { 
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true); 
    const cardImage = cardElement.querySelector('.card__image'); 
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');  
    
    cardImage.src = cardData.link; 
    cardImage.alt = cardData.name; 
    cardTitle.textContent = cardData.name;
 
    cardImage.addEventListener('click', () => handlerImage(cardData));
    deleteButton.addEventListener('click', () => { 
        removeCard(cardElement); 
    }); 
    return cardElement; 
} 
export function deleteCard(cardElement) { 
    cardElement.remove(); 
} 