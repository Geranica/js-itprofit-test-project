export class Modal {
  modalSelectors = {
    modal: '[data-modal]',
    openModal: '[data-modal-open]',
    closeModal: '[data-modal-close]',
  };

  constructor() {
    this.modalElement = document.querySelector(this.modalSelectors.modal);
    this.openModalElement = document.querySelector(this.modalSelectors.openModal);
    this.closeModalElement = document.querySelector(this.modalSelectors.closeModal);

    this.bindEvents();
  }

  scrollControl(booleanValue) {
    if (booleanValue) {
      document.body.classList.add('block-scroll');
    } else {
      document.body.classList.remove('block-scroll');
    }
  }

  openModalWithBlockScroll() {
    this.modalElement.showModal();
    this.scrollControl(true);
  }

  closeModalWithUnblockScroll() {
    this.modalElement.close();
    this.scrollControl(false);
  }

  closeModalOnBackdropClick(event) {
    const modal = event.currentTarget;
    const { target } = event;

    const isOnBackdropClick = modal === target;

    if (!isOnBackdropClick) return;

    this.closeModalWithUnblockScroll();
  }

  bindEvents() {
    this.openModalElement.addEventListener('click', () => this.openModalWithBlockScroll());
    this.closeModalElement.addEventListener('click', () => this.closeModalWithUnblockScroll());
    this.modalElement.addEventListener('click', (event) => this.closeModalOnBackdropClick(event));
    this.modalElement.addEventListener('cancel', () => this.scrollControl(false));
  }
}
