export const enableValidation = (settings) => {
    const forms = document.querySelectorAll(settings.formSelector);
    forms.forEach(form => {
      form.addEventListener('submit', (evt) => evt.preventDefault());
      setFormListeners(form, settings);
    });
  };

  function setFormListeners(form, settings) {
    const inputs = form.querySelectorAll(settings.inputSelector);
    const submitButton = form.querySelector(settings.submitButtonSelector);
    
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        checkInputValidity(form, input, settings);
        toggleButtonState(form, inputs, submitButton, settings);
      });
    });
  };

  function checkInputValidity(form, input, settings) {
    const errorElement = form.querySelector(`#${input.id}-error`);
    const customError = input.dataset.error || "Разрешены только...";
    
    if (!input.validity.valid) {
      input.classList.add(settings.inputErrorClass);
      errorElement.textContent = input.validity.patternMismatch ? customError : input.validationMessage;
      errorElement.classList.add(settings.errorClass);
    } else {
      input.classList.remove(settings.inputErrorClass);
      errorElement.textContent = '';
      errorElement.classList.remove(settings.errorClass);
    }
  };

  function toggleButtonState(form, inputs, button, settings) {
    const isValid = Array.from(inputs).every(input => input.validity.valid);
    
    button.disabled = !isValid;
    button.classList.toggle(settings.inactiveButtonClass, !isValid);
  };

  export const clearValidation = (form, settings) => {
    const inputs = form.querySelectorAll(settings.inputSelector);
    const submitButton = form.querySelector(settings.submitButtonSelector);
    
    inputs.forEach(input => {
      input.classList.remove(settings.inputErrorClass);
      const errorElement = form.querySelector(`#${input.id}-error`);
      errorElement.textContent = '';
      errorElement.classList.remove(settings.errorClass);
    });
    
    submitButton.disabled = true;
    submitButton.classList.add(settings.inactiveButtonClass);
  };