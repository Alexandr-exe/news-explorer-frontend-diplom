import { succes } from '../constants/constants';

class Popup {
  constructor(container, crosses, signUp, singIn, header) {
    this.crosses = crosses;
    this.container = container;
    this.signUp = signUp;
    this.singIn = singIn;
    this.header = header;

    this.open = this.open.bind(this);
    this.clearContent = this.clearContent.bind(this);
    this.close = this.close.bind(this);
    this.setEventListeners = this.setEventListeners.bind(this);
    this.succes = this.succes.bind(this);
    this.registr = this.registr.bind(this);
    this.auth = this.auth.bind(this);
    this.setEventListeners();
  }

  open(event) {
    const opened = this
      .container.querySelector('.popup_is-opened');
    const name = event.target.getAttribute('data-modal');
    if (opened !== null) {
      opened.classList.remove('popup_is-opened');
      this
        .container.querySelector(`.popup[data-modal=${name}]`)
        .classList.toggle('popup_is-opened');
    } else {
      this.clearContent();
      this
        .container.querySelector(`.popup[data-modal=${name}]`)
        .classList.toggle('popup_is-opened');
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

  succes() {
    this.close();
    succes.classList.add('popup_is-opened');
  }

  registr(event) {
    event.preventDefault();
    const form = event.target;
    const email = this.container.querySelector('#email-reg');
    const password = this.container.querySelector('#password-reg');
    const name = this.container.querySelector('#name-reg');
    this.signUp(email.value, password.value, name.value)
      .then((data) => {
        if (data !== undefined) {
          form.reset();
          this.succes()
        }
      });
  }

  auth(event) {
    event.preventDefault();
    const form = event.target
    const email = this.container.querySelector('#email-login');
    const password = this.container.querySelector('#password-login');
    this.singIn(email.value, password.value)
      .then((data) => {
        localStorage.setItem('token', data.token)
        form.reset();
        location.reload();
        this.close();
        this.header();
      })
      .catch((err)=>alert(err.message))
  }

  setEventListeners() {
    this.crosses.forEach((item) => {
      item.addEventListener('click', this.close);
    });
  }
}

export default Popup;
