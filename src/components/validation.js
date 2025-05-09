export function enableValidation(settings) {
    const forms = document.querySelectorAll(settings.formSelector);
    forms.forEach(form => {
      form.addEventListener('submit', (evt) => evt.preventDefault());
      setEventListeners(form, settings);
    });
  }
  
  function setEventListeners(form, config) {
    const inputs = Array.from(form.querySelectorAll(config.inputSelector));
    const submitButton = form.querySelector(config.submitButtonSelector);
  
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        checkInputValidity(form, input, config);
        toggleButtonState(form, inputs, submitButton, config);
      });
    });
  
    toggleButtonState(form, inputs, submitButton, config);
  }
  
  function checkInputValidity(form, input, config) {
    let errorMessage = '';
  if (input.id === 'card-name' && input.validity.patternMismatch) {
    errorMessage = input.dataset.error;
  } 
  else if (input.type === 'url' && input.validity.typeMismatch) {
    errorMessage = 'Введите URL в формате: http://example.com';
  }
  else if (!input.validity.valid) {
    errorMessage = input.validationMessage;
  }
  if (errorMessage) {
    showInputError(form, input, config, errorMessage);
  } else {
    hideInputError(form, input, config);
  }
}
  
  function showInputError(form, input, config, message) {
    const errorElement = form.querySelector(`#${input.id}-error`);
    input.classList.add(config.inputErrorClass);
    errorElement.textContent = message;
    errorElement.classList.add(config.errorClass);
  }
  
  function hideInputError(form, input, config) {
    const errorElement = form.querySelector(`#${input.id}-error`);
    input.classList.remove(config.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(config.errorClass);
  }
  
  function toggleButtonState(form, inputs, button, config) {
    const isValid = inputs.every(input => input.validity.valid);
    button.disabled = !isValid;
    button.classList.toggle(config.inactiveButtonClass, !isValid);
  }
  
  export function clearValidation(form, config) {
    const inputs = Array.from(form.querySelectorAll(config.inputSelector));
    const submitButton = form.querySelector(config.submitButtonSelector);
  
    inputs.forEach(input => {
      hideInputError(form, input, config);
    });
  
    toggleButtonState(form, inputs, submitButton, config);
  }