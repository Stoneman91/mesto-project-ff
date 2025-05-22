export function getuserInfo(name, about, avatar, _id) {
  return fetch("https://nomoreparties.co/v1/wff-cohort-39/users/me", {
    headers: {
      authorization: "25ebb938-e518-422d-a33a-522667db90ac",
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error(`Ошибка: ${res.status}`);
    }
    return res.json();
  });
}

export function getCards() {
  return fetch("https://nomoreparties.co/v1/wff-cohort-39/cards", {
    headers: {
      authorization: "25ebb938-e518-422d-a33a-522667db90ac",
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error(`Ошибка: ${res.status}`);
    }
    return res.json();
  });
}

export function editProfile() {
  return fetch("https://nomoreparties.co/v1/wff-cohort-39/users/me", {
    method: "PATCH",
    headers: {
      authorization: "25ebb938-e518-422d-a33a-522667db90ac",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then((res) => {
    if (!res.ok) {
      throw new Error(`Ошибка: ${res.status}`);
    }
    return res.json();
  });
}
