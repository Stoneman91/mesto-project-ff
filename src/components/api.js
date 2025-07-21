const config = {
  headers: {
    authorization: "981a0154-194c-4782-aa17-96b010eb9cce",
    "Content-Type": "application/json",
  },
};

function checkResponse(res) {
if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    };

export function getUserInfo(name, about, avatar, _id) {
  return fetch("https://nomoreparties.co/v1/wff-cohort-42/users/me", {
    headers: config.headers,
  }).then(checkResponse);
}

export function getCards() {
  return fetch("https://nomoreparties.co/v1/wff-cohort-42/cards", {
    headers: config.headers,
  }).then(checkResponse);
}

export function editProfile(name, about) {
  return fetch("https://nomoreparties.co/v1/wff-cohort-42/users/me", {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then(checkResponse);
}

export function addNewCard(name, link) {
  return fetch("https://nomoreparties.co/v1/wff-cohort-42/cards", {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then(checkResponse);
}

export function deleteCardFromServer(cardId) {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-42/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponse);
}

export const likeCard = (cardId) => {
  return fetch(
    `https://nomoreparties.co/v1/wff-cohort-42/cards/likes/${cardId}`,
    {
      method: "PUT",
      headers: config.headers,
    }
  ).then(checkResponse);
};

export const unlikeCard = (cardId) => {
  return fetch(
    `https://nomoreparties.co/v1/wff-cohort-42/cards/likes/${cardId}`,
    {
      method: "DELETE",
      headers: config.headers,
    }
  ).then(checkResponse);
};

export function editAvatar(avatar) {
  return fetch("https://nomoreparties.co/v1/wff-cohort-42/users/me/avatar", {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar,
    }),
  }).then(checkResponse);
}
