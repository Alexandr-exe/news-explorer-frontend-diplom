class FormValidator {
  constructor(form) {
    this.form = form;
    this.checkInputValidity = this.checkInputValidity.bind(this);
    this.sendToValidate = this.sendToValidate.bind(this);
    this.setEventListeners = this.setEventListeners.bind(this)

    this.setEventListeners()
  }

  setSubmitButton(button, state) {
    if (state) {
      button.removeAttribute('disabled');
      button.classList.add(`popup__button_valid`);
      button.classList.remove(`popup__button_invalid`);
    } else {
      button.setAttribute('disabled', true);
      button.classList.add(`popup__button_invalid`);
      button.classList.remove(`popup__button_valid`);
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

  checkInputValidity(input) {
    if (input.tagName !== "INPUT") return true;
    const validity = input.validity;
    if (validity.valid) {
      this.errorMessage(input).textContent = "";
      return true;
    }
    if (validity.tooShort) {
      this.errorMessage(input).textContent = "Введите от 2 до 30 символов";
      return false;
    }
    if (validity.typeMismatch || validity.type === 'url') {
      this.errorMessage(input).textContent = 'Здесь должна быть ссылка';
      return false
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