const REG_EXP_EMAIL = /[a-zA-Z]{1}([A-Za-z0-9_-])*@[a-zA-Z0-9.-]+\.[a-zA-Z]+/;
const imageUrl = 'https://via.placeholder.com/300';

const body = document.getElementById('body');
const buttons = document.querySelectorAll('.button_popup');
const crosses = document.querySelectorAll('.popup__close');
const resultSearch = document.querySelector('.result-search__card');
const more = document.querySelector('.button__more');
const preloader = document.querySelector('.preloader');
const succes = document.querySelector('.popup[data-modal=succes]');
const saved = document.querySelector('.saved__card');
const nav = document.querySelector('.nav__desktop-menu');
const buttonLogout = document.querySelector('#button-logout');
const buttonAuth = document.querySelector('#auth-button');
const main = document.querySelector('.main');
const buttonDelete = document.querySelector('.button__delete');

const loginForm = document.querySelector('#singIn');
const regForm = document.querySelector('#singUp');
const searchForm = document.querySelector('#search');
const search = document.querySelector('#input-search');

export {
  REG_EXP_EMAIL,
  imageUrl,
  body,
  buttons,
  crosses,
  resultSearch,
  more,
  preloader,
  succes,
  loginForm,
  regForm,
  searchForm,
  search,
  saved,
  nav,
  buttonLogout,
  buttonAuth,
  main,
  buttonDelete
};