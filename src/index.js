import './styles/index.css';
import Popup from './js/components/Popup';

const body = document.getElementById('body');
const buttons = document.querySelectorAll('.button_popup');
const crosses = document.querySelectorAll('.popup__close')

const popup = new Popup(body, crosses)

buttons.forEach(button => {
  button.addEventListener('click', (event) => {
    popup.open(event)
  })
})