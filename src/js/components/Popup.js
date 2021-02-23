class Popup {
  constructor(container, crosses) {
    this.crosses = crosses
    this.container = container

    this.open = this.open.bind(this)
    this.clearContent = this.clearContent.bind(this)
    this.close = this.close.bind(this)
    this.setEventListeners = this.setEventListeners.bind(this)
    this.setEventListeners()
  }

  open(event) {
    let opened = this
      .container.querySelector('.popup_is-opened')
    const name = event.target.getAttribute('data-modal')
    if (opened !== null) {
      opened.classList.remove('popup_is-opened')
      this
        .container.querySelector(`.popup[data-modal=${name}]`)
        .classList.toggle('popup_is-opened')
    }else{
      this.clearContent()
      this
        .container.querySelector(`.popup[data-modal=${name}]`)
        .classList.toggle('popup_is-opened')
    }

  }

  clearContent() {
    this.container.querySelectorAll('.popup__error').forEach((el) => {
      el.textContent = '';
    });
  }

  close() {
    this
      .container
      .querySelector('.popup_is-opened')
      .classList
      .remove('popup_is-opened');
    this.clearContent();
  }


  setEventListeners() {
    this.crosses.forEach(item => {
      item.addEventListener('click', this.close)
    })
  }
}
export default Popup