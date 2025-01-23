'use strict';

import './../index.html';
import './../index.scss';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import { phoneMask } from './modules/phoneMask/phoneMask';
import { MASK_TEMPLATES } from './modules/phoneMask/constants';
import { FormValidation } from './modules/formValidation/formValidation';

window.addEventListener('DOMContentLoaded', () => {
  phoneMask('#phone-input', MASK_TEMPLATES.DE);
  new FormValidation();
});
