export class FormValidation {
  formSelectors = {
    formFieldErrors: '[data-feedback-form-field-error]',
  };

  errorMessages = {
    valueMissing: () => 'This field cannot be empty.',
    patternMismatch: ({ title }) => title || 'Please match the requested format.',
    tooShort: ({ minLength }) => `Minimum length for this field is ${minLength} characters.`,
    tooLong: ({ maxLength }) => `Maximum length for this field is ${maxLength} characters.`,
  };

  validateFormField(formFieldControlElement) {
    const errors = formFieldControlElement.validity;
    const errorMessages = [];

    Object.entries(this.errorMessages).forEach(([errorType, getErrorMessage]) => {
      if (errors[errorType]) {
        errorMessages.push(getErrorMessage(formFieldControlElement));
      }
    });

    this.manageErrors(formFieldControlElement, errorMessages);

    const isValid = errorMessages.length === 0;
    formFieldControlElement.ariaInvalid = !isValid;

    formFieldControlElement.classList.remove(
      'feedback-form__field_valid',
      'feedback-form__field_invalid'
    );

    if (isValid) {
      formFieldControlElement.classList.add('feedback-form__field_valid');
    } else {
      formFieldControlElement.classList.add('feedback-form__field_invalid');
    }

    return isValid;
  }

  validateForm(formElement) {
    const requiredControlElements = [...formElement.elements].filter((item) => item.required);

    let isFormValid = true;

    requiredControlElements.forEach((item) => {
      const isFieldValid = this.validateFormField(item);
      if (!isFieldValid) {
        isFormValid = false;
      }
    });

    return isFormValid;
  }

  manageErrors(formFieldControlElement, errorMessages) {
    const formFieldErrorElement = formFieldControlElement.parentElement.querySelector(
      this.formSelectors.formFieldErrors
    );

    formFieldErrorElement.innerHTML = errorMessages
      .map((item) => `<span class="feedback-form__field-error">${item}</span>`)
      .join('');
  }
}
