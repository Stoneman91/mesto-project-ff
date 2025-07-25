const cardTemplate = document.querySelector("#card-template").content;
export function createCard(
  cardData,
  onDeleteClick,
  handleImageClick,
  handleLikeClick,
  currentUserId,
  likeCard,
  unlikeCard
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

  updateLikesState(cardData.likes, likeButton, likeCountElement, currentUserId);

  cardImage.addEventListener("click", () => handleImageClick(cardData));

  if (cardData.owner._id === currentUserId) {
    deleteButton.addEventListener(
      "click",
      () => onDeleteClick(cardElement, cardData._id) // вызывает попап подтверждения
    );
  } else {
    deleteButton.remove();
  }

  likeButton.addEventListener("click", () => {
    handleLikeClick(cardData._id, likeButton, likeCountElement, currentUserId, likeCard, unlikeCard);
  });

  return cardElement;
}

export function handleLikeClick(cardId, likeButton, likeCountElement, currentUserId, likeCard, unlikeCard) {

  // Определяем текущее состояние по данным с сервера
  const isLiked = likeButton.classList.contains("card__like-button_is-active");
  const apiMethod = isLiked ? unlikeCard : likeCard;

  apiMethod(cardId)
    .then((updatedCard) => {
      // Обновляем UI на основе актуальных данных с сервера
      updateLikesState(
        updatedCard.likes,
        likeButton,
        likeCountElement,
        currentUserId
      );
    })
    .catch((err) => {
      console.error("Ошибка при обновлении лайка:", err);
    });
}



function updateLikesState(likes, likeButton, likeCountElement, currentUserId) {
  const likesCount = likes.length;
  likeCountElement.textContent = likesCount;
  // есть ли текущий пользователь в массиве лайков
  const isLiked = likes.some((like) => like._id === currentUserId);
  likeButton.classList.toggle("card__like-button_is-active", isLiked);
}
