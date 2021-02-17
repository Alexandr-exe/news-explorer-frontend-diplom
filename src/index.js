import './styles/index.css';
import Popup from './js/components/Popup';

const body = document.getElementById('body');
const buttons = document.querySelectorAll('.button_popup');
const crosses = document.querySelectorAll('.popup__close')

const popup = new Popup(body, crosses)

buttons.forEach(button => {
  button.addEventListener('click', (event) => {
    let opened = document.querySelector('.popup_is-opened')
    if (opened !== null) {
      opened.classList.remove('popup_is-opened')
      popup.open(event)
    }else{
      popup.open(event) 
    }  
  })
})