export class FormValidation {
  formSelectors = {
    form: '[data-feedback-form]',
    formFieldErrors: '[data-feedback-form-field-error]',
  };

  errorMessages = {
    valueMissing: () => 'This field cannot be empty.',
    patternMismatch: ({ title }) => title || 'Please match the requested format.',
    tooShort: ({ minLength }) => `Minimum length for this field is ${minLength} characters.`,
    tooLong: ({ maxLength }) => `Maximum length for this field is ${maxLength} characters.`,
  };

  constructor() {
    this.bindEvents();
  }

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

    return isValid;
  }

  manageErrors(formFieldControlElement, errorMessages) {
    const formFieldErrorElement = formFieldControlElement.parentElement.querySelector(
      this.formSelectors.formFieldErrors
    );

    formFieldErrorElement.innerHTML = errorMessages
      .map((item) => `<span class="feedback-form__field-error">${item}</span>`)
      .join('');
  }

  onSubmit(event) {
    const isFormElement = event.target.matches(this.formSelectors.form);

    if (!isFormElement) return;

    const requiredControlElements = [...event.target.elements].filter((item) => item.required);

    let isFormValid = true;
    let firstInvalidFieldControl = null;

    requiredControlElements.forEach((item) => {
      const isFormFieldValid = this.validateFormField(item);

      if (!isFormFieldValid) {
        isFormValid = false;

        if (!firstInvalidFieldControl) {
          firstInvalidFieldControl = item;
        }
      }
    });

    if (!isFormValid) {
      event.preventDefault();
      firstInvalidFieldControl.focus();
    }
  }

  bindEvents() {
    document.addEventListener('submit', (event) => {
      this.onSubmit(event);
    });
  }
}
