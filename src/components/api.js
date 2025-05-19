
export function userInfo () {
return fetch('https://nomoreparties.co/v1/wff-cohort-39/users/me', {
  headers: {
    authorization: '25ebb938-e518-422d-a33a-522667db90ac'
  }
})
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  })
};

export function getCards () {
    return fetch('https://nomoreparties.co/v1/wff-cohort-39/cards ', {
  headers: {
    authorization: '25ebb938-e518-422d-a33a-522667db90ac'
  }
})
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  })
}