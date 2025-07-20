import "../pages/index.css";
import { createCard, deleteCard, handleLikeClick } from "../components/card.js";
import { closeModal, openModal } from "../components/modal.js";
import { enableValidation, clearValidation } from "../components/validation.js";
import { getUserInfo, getCards, editProfile,addNewCard } from "../components/api.js";

const cardsContainer = document.querySelector(".places__list");
const popupEdit = document.querySelector(".popup_type_edit");
const popupAddCard = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const profileName = document.querySelector(".profile__title");
const profileImage = document.querySelector('.profile__image');
const profileEditForm = popupEdit.querySelector(".popup__form");
const nameInput = profileEditForm.querySelector(".popup__input_type_name");
const jobInput = profileEditForm.querySelector(".popup__input_type_description");
const profileDescription = document.querySelector('.profile__description');
const addCardForm = document.querySelector(".popup_type_new-card .popup__form");
const cardNameInput = addCardForm.querySelector(".popup__input_type_card-name");
const cardLinkInput = addCardForm.querySelector(".popup__input_type_url");

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(validationConfig);

Promise.all([getUserInfo(), getCards()])
  .then(([userData, cards]) => {
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = `url(${userData.avatar})`;
    window.currentUserId = userData._id;
    renderCards(cards);
  })
  .catch(err => {
    console.error('Ошибка при загрузке данных:', err);
  });

function handlePopupImage(cardData) {
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;
  openModal(popupTypeImage);
}

function renderCards(cards) {
  cardsContainer.innerHTML = '';
  
  cards.forEach((cardData) => {
    const cardElement = createCard(
      cardData,
      deleteCard,
      handlePopupImage,
      handleLikeClick
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

// Новый обработчик отправки формы профиля
profileEditForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  
  const submitButton = profileEditForm.querySelector('.popup__button');
  const initialText = submitButton.textContent;
  submitButton.textContent = 'Сохранение...';
  
  editProfile(nameInput.value, jobInput.value)
    .then(userData => {
      profileName.textContent = userData.name;
      profileDescription.textContent = userData.about;
      closeModal(document.querySelector('.popup_type_edit'));
    })
    .catch(err => {
      console.error('Ошибка при обновлении профиля:', err);
    })
    .finally(() => {
      submitButton.textContent = initialText;
    });
});

profileEditForm.addEventListener("submit", editProfile);

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  
  const submitButton = addCardForm.querySelector(".popup__button");
  const initialText = submitButton.textContent;
  submitButton.textContent = "Сохранение...";

  addNewCard(cardNameInput.value, cardLinkInput.value)
    .then((newCard) => {
      const cardElement = createCard(
        newCard,
        (cardElement, cardId) => {
          // Функция удаления карточки
          deleteCard(cardElement, cardId);
        },
        handlePopupImage,
        handleLikeClick
      );
      
      // Добавляем новую карточку в начало списка
      cardsContainer.append(cardElement);
      
      // Закрываем попап и сбрасываем форму
      closeModal(popupAddCard);
      addCardForm.reset();
    })
    .catch((err) => {
      console.error("Ошибка при добавлении карточки:", err);
    })
    .finally(() => {
      submitButton.textContent = initialText;
    });
}

addCardForm.addEventListener("submit", handleAddCardSubmit);