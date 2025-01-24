import { FormValidation } from '../formValidation/formValidation';
import { formSubmit } from '../formSubmit/formSubmit';
import { phoneMask } from '../phoneMask/phoneMask';

import { formDataToObj } from '../../utils/formDataToObj';

import { MASK_TEMPLATES } from '../phoneMask/constants';

export class FormController {
  formSelectors = {
    form: '[data-feedback-form]',
    messageContainer: '[data-feedback-message]',
    spinner: '[data-feedback-spinner]',
  };

  statusList = {
    success: 'success',
    error: 'error',
  };

  constructor() {
    this.validation = new FormValidation();
    this.phoneMask = phoneMask('#phone', MASK_TEMPLATES.DE);
    this.bindEvents();
  }

  resetForm(formElement) {
    const requiredControlElements = [...formElement.elements].filter((item) => item.required);

    requiredControlElements.forEach((item) => {
      item.innerHTML = '';
      item.classList.remove('feedback-form__field_valid', 'feedback-form__field_invalid');
    });

    formElement.reset();
    this.phoneMask.value = '';
  }

  displaySuccessMessage(message) {
    const messageContainer = document.querySelector(this.formSelectors.messageContainer);

    if (!messageContainer) return;

    messageContainer.innerHTML = '';

    const messageTitle = document.createElement('span');
    messageTitle.innerHTML = 'Success';
    messageTitle.classList.add(
      'feedback-form__message-title',
      'feedback-form__message-title_success'
    );

    messageContainer.appendChild(messageTitle);

    messageContainer.classList.add('feedback-form__message-container_success');

    const messageElement = document.createElement('span');
    messageElement.innerHTML = message;
    messageContainer.appendChild(messageElement);

    setTimeout(() => {
      messageContainer.innerHTML = '';
      messageContainer.classList.remove('feedback-form__message-container_success}');
    }, 4000);
  }

  displayErrorMessage(messagesObject) {
    const messageContainer = document.querySelector(this.formSelectors.messageContainer);

    if (!messageContainer) return;

    messageContainer.innerHTML = '';

    const messageTitle = document.createElement('span');
    messageTitle.innerHTML = 'Error';
    messageTitle.classList.add(
      'feedback-form__message-title',
      'feedback-form__message-title_error'
    );

    messageContainer.appendChild(messageTitle);

    Object.values(messagesObject).forEach((item) => {
      const messageElement = document.createElement('span');
      messageElement.innerHTML = item;
      messageContainer.appendChild(messageElement);
    });

    const closeButton = document.createElement('button');
    closeButton.innerHTML = 'Close';
    closeButton.classList.add('button', 'feedback-form__close-button');
    closeButton.addEventListener('click', () => {
      messageContainer.innerHTML = '';
      messageContainer.classList.remove('feedback-form__message-container_error');
    });

    messageContainer.appendChild(closeButton);
    messageContainer.classList.add('feedback-form__message-container_error');
  }

  setLoading(booleanValue) {
    const spinnerElement = document.querySelector(this.formSelectors.spinner);

    if (booleanValue) {
      spinnerElement.classList.add('feedback-form__spinner_active');
    } else {
      spinnerElement.classList.remove('feedback-form__spinner_active');
    }
  }

  async onSubmit(event) {
    const formElement = event.target;

    if (!formElement.matches(this.formSelectors.form)) return;

    event.preventDefault();

    const isValid = this.validation.validateForm(formElement);
    if (!isValid) return;

    const phoneInputName = 'phone';
    const unmaskedPhone = this.phoneMask.unmaskedValue;

    const formData = new FormData(formElement);
    if (formData.has(phoneInputName)) {
      formData.set(phoneInputName, unmaskedPhone);
    }

    const dataObj = formDataToObj(formData);

    this.setLoading(true);
    const response = await formSubmit(dataObj);
    this.setLoading(false);

    if (response.status === this.statusList.success) {
      this.displaySuccessMessage(response.msg);
    }

    if (response.status === this.statusList.error) {
      this.displayErrorMessage(response.fields);
    }

    this.resetForm(formElement);
  }

  bindEvents() {
    document.addEventListener('submit', (event) => this.onSubmit(event));
  }
}
