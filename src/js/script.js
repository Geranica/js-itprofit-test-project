'use strict';

import './../index.html';
import './../index.scss';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import { FormController } from './modules/formController/formController';
import { Modal } from './modules/modal/modal';

window.addEventListener('DOMContentLoaded', () => {
  new FormController();
  new Modal();
});
