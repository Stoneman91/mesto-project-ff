import "../pages/index.css";
import { createCard, handleLikeClick } from "../components/card.js";
import { closeModal, openModal } from "../components/modal.js";
import { enableValidation, clearValidation } from "../components/validation.js";
import {
  getUserInfo,
  getCards,
  editProfile,
  addNewCard,
  deleteCardFromServer,
  likeCard,
  unlikeCard,
  editAvatar,
} from "../components/api.js";

let currentUserId = null;

// DOM элементы
const popupConfirm = document.querySelector(".popup_type_confirm");
const confirmForm = popupConfirm.querySelector(".popup__form");
const cardsContainer = document.querySelector(".places__list");
const popupEdit = document.querySelector(".popup_type_edit");
const popupAddCard = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const profileName = document.querySelector(".profile__title");
const profileImage = document.querySelector(".profile__image");
const profileEditForm = popupEdit.querySelector(".popup__form");
const nameInput = profileEditForm.querySelector(".popup__input_type_name");
const jobInput = profileEditForm.querySelector(
  ".popup__input_type_description"
);
const profileDescription = document.querySelector(".profile__description");
const addCardForm = document.querySelector(".popup_type_new-card .popup__form");
const cardNameInput = addCardForm.querySelector(".popup__input_type_card-name");
const cardLinkInput = addCardForm.querySelector(".popup__input_type_url");
const popupEditAvatar = document.querySelector(".popup_type_edit-avatar");
const editAvatarForm = popupEditAvatar.querySelector(".popup__form");
const avatarLinkInput = editAvatarForm.querySelector(
  ".popup__input_type_avatar-url"
);

//  сабмит
const profileSubmitButton = profileEditForm.querySelector(".popup__button");
const cardSubmitButton = addCardForm.querySelector(".popup__button");
const avatarSubmitButton = editAvatarForm.querySelector(".popup__button");
const confirmSubmitButton = confirmForm.querySelector(".popup__button");

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// изменение состояния кнопки
function renderLoading(
  button,
  isLoading,
  loadingText = "Сохранение...",
  defaultText = button.dataset.originalText || button.textContent
) {
  if (!button.dataset.originalText) {
    button.dataset.originalText = button.textContent;
  }
  button.textContent = isLoading ? loadingText : defaultText;
  button.disabled = isLoading;
}

enableValidation(validationConfig);

Promise.all([getUserInfo(), getCards()])
  .then(([userData, cards]) => {
    currentUserId = userData._id;
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = `url(${userData.avatar})`;
    renderCards(cards, currentUserId);
  })
  .catch((err) => {
    console.error("Ошибка при загрузке данных:", err);
  });

function handlePopupImage(cardData) {
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;
  openModal(popupTypeImage);
}

function renderCards(cards) {
  cardsContainer.innerHTML = "";

  cards.forEach((cardData) => {
    const cardElement = createCard(
      cardData,
      handleDeleteClick,
      handlePopupImage,
      handleLikeClick,
      currentUserId,
      likeCard,
      unlikeCard
    );
    cardsContainer.append(cardElement);
  });
}

function handleAddCard() {
  addCardForm.reset();
  clearValidation(addCardForm, validationConfig);
  openModal(popupAddCard);
}

function fillProfileForm() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(profileEditForm, validationConfig);
  openModal(popupEdit);
}

editButton.addEventListener("click", fillProfileForm);
addButton.addEventListener("click", handleAddCard);

// Обработчик отправки формы профиля
profileEditForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  renderLoading(profileSubmitButton, true);

  editProfile(nameInput.value, jobInput.value)
    .then((userData) => {
      profileName.textContent = userData.name;
      profileDescription.textContent = userData.about;
      closeModal(popupEdit);
    })
    .catch((err) => {
      console.error("Ошибка при обновлении профиля:", err);
    })
    .finally(() => {
      renderLoading(profileSubmitButton, false);
    });
});

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  renderLoading(cardSubmitButton, true, "Создание...");

  addNewCard(cardNameInput.value, cardLinkInput.value)
    .then((newCard) => {
      const cardElement = createCard(
        newCard,
        handleDeleteClick,
        handlePopupImage,
        handleLikeClick,
        currentUserId,
        likeCard,
        unlikeCard
      );

      cardsContainer.prepend(cardElement);
      closeModal(popupAddCard);
      addCardForm.reset();
    })
    .catch((err) => {
      console.error("Ошибка при добавлении карточки:", err);
    })
    .finally(() => {
      renderLoading(cardSubmitButton, false);
    });
}

addCardForm.addEventListener("submit", handleAddCardSubmit);

let cardToDelete = null;

// подтверждение удаления
function handleConfirmSubmit(evt) {
  evt.preventDefault();
  if (!cardToDelete) return;

  renderLoading(confirmSubmitButton, true, "Удаление...", "Да");

  deleteCardFromServer(cardToDelete.id)
    .then(() => {
      cardToDelete.element.remove();
      closeModal(popupConfirm);
      cardToDelete = null;
    })
    .catch((err) => {
      console.error("Ошибка при удалении:", err);
    })
    .finally(() => {
      renderLoading(confirmSubmitButton, false, "Удаление...", "Да");
    });
}

confirmForm.addEventListener("submit", handleConfirmSubmit);

function handleDeleteClick(cardElement, cardId) {
  cardToDelete = {
    element: cardElement,
    id: cardId,
  };
  openModal(popupConfirm);
}

profileImage.addEventListener("click", () => {
  editAvatarForm.reset();
  clearValidation(editAvatarForm, validationConfig);
  openModal(popupEditAvatar);
});

editAvatarForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  renderLoading(avatarSubmitButton, true);

  editAvatar(avatarLinkInput.value)
    .then((userData) => {
      profileImage.style.backgroundImage = `url(${userData.avatar})`;
      closeModal(popupEditAvatar);
    })
    .catch((err) => {
      console.error("Ошибка при обновлении аватара:", err);
    })
    .finally(() => {
      renderLoading(avatarSubmitButton, false);
    });
});
