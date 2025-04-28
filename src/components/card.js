const cardTemplate = document.querySelector('#card-template').content;
export function createCard(cardData, removeCard, handleImageClick, handleLikeClick) { 
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true); 
    const cardImage = cardElement.querySelector('.card__image'); 
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');  
    const likeButton = cardElement.querySelector('.card__like-button');
    
    cardImage.src = cardData.link; 
    cardImage.alt = cardData.name; 
    cardTitle.textContent = cardData.name;
 
    cardImage.addEventListener('click', () => handleImageClick(cardData));
    deleteButton.addEventListener('click', () => { 
        removeCard(cardElement); 
    }); 
    likeButton.addEventListener('click', handleLikeClick);
    return cardElement; 
} 
export function deleteCard(cardElement) { 
    cardElement.remove(); 
} 

export function handleLikeClick(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
}
