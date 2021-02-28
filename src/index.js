import './styles/index.css';
import {
  body,
  buttons,
  crosses,
  resultSearch,
  more,
  loginForm,
  regForm,
  searchForm,
  nav,
  buttonLogout
} from './js/constants/constants';

import { newsApiServer, defaultMainApi } from './js/config/config';
import { removeClassFail, removeClassPositive } from './js/utils/function';


import Popup from './js/components/Popup';
import Header from './js/components/Header'
import NewsApi from './js/api/NewsApi';
import MainApi from './js/api/MainApi';
import NewsCard from './js/components/NewsCard';
import NewsCardList from './js/components/NewsCardList';
import FormValidator from './js/components/FormValidator';


const newsApi = new NewsApi(newsApiServer);
const mainApi = new MainApi(defaultMainApi);

function newCard(article) {
  const newCard = new NewsCard(mainApi)
  newCard.createCard(article)
  newCard.setEventListeners()
  return newCard.element
}

const newsCardList = new NewsCardList(resultSearch, newCard, mainApi.getArticles);
const searchFormValidator = new FormValidator(searchForm);
const loginFormValidator = new FormValidator(loginForm);
const regFormValidator = new FormValidator(regForm);
const header = new Header(nav, buttonLogout, mainApi.getUser, mainApi.unlogin);
const popup = new Popup(body, crosses, mainApi.signUp, mainApi.signIn, header.rename);


window.addEventListener('keydown', (event) => {
  if (event.keyCode === 27) {
    popup.close();
  }
});

function renderSearch(event) {
  event.preventDefault();
  newsCardList.renderLoading(true);
  removeClassFail();
  removeClassPositive();
  newsApi.getApi()
    .then((res) => {
      if (res.articles.length === 0) {
        document.querySelector('.result-search__fail').classList.add('result-search__fail_visible');
        removeClassPositive();
      } else {
        removeClassFail();
        document.querySelector('.result-search__positive').classList.add('result-search__positive_visible');
        newsCardList.render(res.articles);
      }
    })
    .finally(() => {
      newsCardList.renderLoading(false);
    });
}

loginForm.addEventListener('submit', popup.auth)
regForm.addEventListener('submit', popup.registr);
searchForm.addEventListener('submit', renderSearch);
more.addEventListener('click', newsCardList.more);

buttons.forEach((button) => {
  button.addEventListener('click', (event) => {
    event.preventDefault();
    regForm.reset();
    loginForm.reset();
    regFormValidator.resetError();
    loginFormValidator.resetError();
    popup.open(event);
  });
});

header.rename()