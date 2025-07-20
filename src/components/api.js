export function getuserInfo(name, about, avatar, _id) {
  return fetch("https://nomoreparties.co/v1/wff-cohort-42/users/me", {
    headers: {
      authorization: "981a0154-194c-4782-aa17-96b010eb9cce",
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error(`Ошибка: ${res.status}`);
    }
    return res.json();
  });
}

export function getCards() {
  return fetch("https://nomoreparties.co/v1/wff-cohort-42/cards", {
    headers: {
      authorization: "981a0154-194c-4782-aa17-96b010eb9cce",
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error(`Ошибка: ${res.status}`);
    }
    return res.json();
  });
}

export function editProfile() {
  return fetch("https://nomoreparties.co/v1/wff-cohort-42/users/me", {
    method: "PATCH",
    headers: {
      authorization: "981a0154-194c-4782-aa17-96b010eb9cce",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: data.name,
      about: data.about
    })
  }).then((res) => {
    if (!res.ok) {
      throw new Error(`Ошибка: ${res.status}`);
    }
    return res.json();
  });
}
