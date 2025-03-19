//Создание карточки + заполнение данными
function AddCard(cardData, removeCard) {
    const cardTemplate = document.querySelector('#card-template').content;
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
  const placesList = document.querySelector('.places__list');
  initialCards.forEach((cardData) => {
    const cardElement = AddCard(cardData, deleteCard);
    placesList.append(cardElement);
  });