'use strict';

import './../index.html';
import './../index.scss';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import { FormController } from './modules/formController/formController';

window.addEventListener('DOMContentLoaded', () => {
  new FormController();
});
