import { REG_EXP_EMAIL } from '../constants/constants'

class FormValidator {
  constructor(form) {
    this.form = form;
    this.checkInputValidity = this.checkInputValidity.bind(this);
    this.sendToValidate = this.sendToValidate.bind(this);
    this._isValidEmail = this._isValidEmail.bind(this);
    this.setEventListeners = this.setEventListeners.bind(this)

    this.setEventListeners()
  }

  setSubmitButton(button, state) {
    if (state) {
      button.removeAttribute('disabled');
      button.classList.add('button__active');
      button.classList.remove('button__disabled');
    } else {
      button.setAttribute('disabled', true);
      button.classList.add('button__disabled');
      button.classList.remove('button__active');
    }
  }

  errorMessage(input) {
    return this.form.querySelector(`#error-${input.id}`);
  }

  resetError() {
    this.form.querySelectorAll('.error').forEach(err => {
      err.textContent = ''
    });
  }

  _isValidEmail(input) {
    return REG_EXP_EMAIL.test(input);
  };

  checkInputValidity(input) {
    if (input.tagName !== "INPUT") return true;
    const validity = input.validity;
    if (validity.valid) {
      this.errorMessage(input).textContent = "";
      return true;
    }

    if (validity.patternMismatch && input.type === "email") {
      this.errorMessage(input).textContent = 'Ввидите валидный email';
      return false;
    }

    if (validity.valueMissing) {
      this.errorMessage(input).textContent = "Обязательное поле";
      return false
    }
  }

  sendToValidate() {
    const submit = this.form.querySelector('.button')
    let input = [...this.form.elements].reduce((acc, el) => this.checkInputValidity(el) && acc, true);
    this.setSubmitButton(submit, input);

  }



  setEventListeners() {
    this.form.addEventListener('input', this.sendToValidate);
  }

}

export default FormValidator