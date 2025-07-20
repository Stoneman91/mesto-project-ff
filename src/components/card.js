const cardTemplate = document.querySelector("#card-template").content;
export function createCard(
  cardData,
  removeCard,
  handleImageClick,
  handleLikeClick
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCountElement = cardElement.querySelector(".card__like-count");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  likeCountElement.textContent = cardData.likes.length;

  const isLiked = cardData.likes.some(like => like._id === window.currentUserId);
  if (isLiked) {
    likeButton.classList.add("card__like-button_is-active");
  }

 cardImage.addEventListener("click", () => handleImageClick(cardData));
  
  if (cardData.owner._id === window.currentUserId) {
    deleteButton.addEventListener("click", () => removeCard(cardElement, cardData._id));
  } else {
    deleteButton.remove();
  }

  likeButton.addEventListener("click", () => {
    handleLikeClick(cardData._id, likeButton, likeCountElement);
  });

  return cardElement;
}
export function deleteCard(cardElement) {
  cardElement.remove();
}

export function handleLikeClick(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}
