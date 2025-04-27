
function handleClose(evt) {
    if(evt.target.classList.contains('popup__close') ||
    evt.target.classList.contains('popup')) {
        const currentPopup = document.querySelector('.popup_is-opened');
        closeModal(currentPopup);
    }
}

function handleKeyClose(evt) {
    if(evt.key === 'Escape') {
        const currentPopup = document.querySelector('.popup_is-opened');
        closeModal(currentPopup);
    }        
}

export function openModal(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleKeyClose);
    popup.addEventListener('click', handleClose);
}


export function closeModal(popup) {
    document.removeEventListener('keydown', handleKeyClose)
    popup.classList.remove('popup_is-opened');
}