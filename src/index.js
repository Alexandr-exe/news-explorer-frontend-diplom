import './styles/index.css';
import Popup from './js/components/Popup';

const header = document.querySelector('header')
const body = document.getElementById('body')
const crosses = document.querySelectorAll('.popup__close')
const popup = new Popup(body, crosses)


header.addEventListener('click', (event) => {
  popup.open(event)
})