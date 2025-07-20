import "../pages/index.css";
import { createCard, deleteCard, handleLikeClick } from "../components/card.js";
import { closeModal, openModal } from "../components/modal.js";
import { enableValidation, clearValidation } from "../components/validation.js";
import { getUserInfo, getCards, editProfile } from "../components/api.js";

const cardsContainer = document.querySelector(".places__list");
const popupEdit = document.querySelector(".popup_type_edit");
const popupAddCard = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const profileImage = document.querySelector('.profile__image');
const profileEditForm = popupEdit.querySelector(".popup__form");
const nameInput = profileEditForm.querySelector(".popup__input_type_name");
const jobInput = profileEditForm.querySelector(".popup__input_type_description");
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

// Включение валидации форм
enableValidation(validationConfig);

// Загрузка данных пользователя и карточек при старте
Promise.all([getUserInfo(), getCards()])
  .then(([userData, cards]) => {
    // Обновляем данные профиля
    profileName.textContent = userData.name;
    profileJob.textContent = userData.about;
    profileImage.style.backgroundImage = `url(${userData.avatar})`;
    
    // Сохраняем ID пользователя
    window.currentUserId = userData._id;
    
    // Рендерим карточки
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
  jobInput.value = profileJob.textContent;
  clearValidation(profileEditForm, validationConfig);
  openModal(popupEdit);
}

editButton.addEventListener("click", fillProfileForm);
addButton.addEventListener("click", handleAddCard);

// Новый обработчик отправки формы профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  
  const saveButton = profileEditForm.querySelector('.popup__button');
  const initialText = saveButton.textContent;
  
  // Меняем текст кнопки на время сохранения
  //saveButton.textContent = 'Сохранение...';
  
  // Отправляем данные на сервер
  editProfile({
    name: nameInput.value,
    about: jobInput.value
  })
  .then((updatedData) => {
    // Обновленные данные на странице
    profileName.textContent = updatedData.name;
    profileJob.textContent = updatedData.about;
    
    // Закрытие
    closeModal(popupEdit);
  })
  .catch(err => {
    console.error('Ошибка при обновлении профиля:', err);
  })
  .finally(() => {
    //исходный текст кнопки
    saveButton.textContent = initialText;
  });
}

profileEditForm.addEventListener("submit", handleProfileFormSubmit);

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const newCardData = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };
  const newCard = createCard(
    newCardData,
    deleteCard,
    handlePopupImage,
    handleLikeClick
  );
  cardsContainer.prepend(newCard);
  addCardForm.reset();
  closeModal(popupAddCard);
}

addCardForm.addEventListener("submit", handleAddCardSubmit);