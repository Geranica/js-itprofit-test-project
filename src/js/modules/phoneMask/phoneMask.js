import IMask from 'imask';

import { MASK_TEMPLATES } from './constants';

export const phoneMask = (selector, maskTemplate = MASK_TEMPLATES.DEFAULT) => {
  const inputElement = document.querySelector(selector);

  if (!inputElement) {
    throw new Error('Input element not found.');
  }

  const maskOptions = {
    mask: maskTemplate,
    placeholderChar: '_',
    lazy: true,
  };

  const maskInstance = IMask(inputElement, maskOptions);

  inputElement.addEventListener('focus', () => {
    maskInstance.updateOptions({ lazy: false });
  });

  inputElement.addEventListener('blur', () => {
    maskInstance.updateOptions({ lazy: true });

    if (!maskInstance.masked.rawInputValue) {
      maskInstance.value = '';
    }
  });

  return maskInstance;
};
