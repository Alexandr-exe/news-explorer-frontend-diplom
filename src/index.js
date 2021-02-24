import './styles/index.css';

import Popup from './js/components/Popup';
import NewsApi from './js/api/NewsApi';
import MainApi from './js/api/MainApi';
import NewsCard from './js/components/NewsCard';
import NewsCardList from './js/components/NewsCardList';
import FormValidator from './js/components/FormValidator';
import { newsApiServer, defaultMainApi } from './js/config/config';
import { removeClassFail, removeClassPositive } from './js/utils/function'


const body = document.getElementById('body');
const buttons = document.querySelectorAll('.button_popup');
const crosses = document.querySelectorAll('.popup__close');
const resultSearch = document.querySelector('.result-search__card');
const more = document.querySelector('.button__more')
const preloader = document.querySelector('.preloader')


const loginForm = document.forms.login
const authForm = document.forms.auth
const searchForm = document.forms.search

const { search } = searchForm.elements



function clearArticle(articleArr) {
  const article = new NewsCard(popup.open, search, mainApi);
  article.createCard(articleArr)
  article.setEventListeners()
  return article.element
}
const popup = new Popup(body, crosses);
const newsApi = new NewsApi(newsApiServer);
const newsCardList = new NewsCardList(resultSearch, clearArticle, preloader);
const searchFormValidator = new FormValidator(searchForm);
const loginFormValidator = new FormValidator(loginForm);
const authFormValidator = new FormValidator(authForm);
const mainApi = new MainApi(defaultMainApi);

window.addEventListener('keydown', function closeFormByKeydown(event) {
  if (event.keyCode === 27) {
    popup.close()
  }
})

function renderSearch(event) {
  event.preventDefault()
  newsCardList.clearArticle()
  newsCardList.renderLoading(true)
  removeClassFail()
  removeClassPositive()
  newsApi.getApi(search.value)
    .then(res => {
      if (res.articles.length == 0) {
        document.querySelector('.result-search__fail').classList.add('result-search__fail_visible')
        removeClassPositive()
      } else {
        removeClassFail()
        document.querySelector('.result-search__positive').classList.add('result-search__positive_visible')
        newsCardList.render(res.articles)
      }
    }
    )
    .finally(() => {
      newsCardList.renderLoading(false)
    })
}

searchForm.addEventListener('submit', renderSearch)
more.addEventListener('click', newsCardList.more)

buttons.forEach(button => {
  button.addEventListener('click', (event) => {
    event.preventDefault();
    authForm.reset();
    loginForm.reset();
    authFormValidator.resetError();
    loginFormValidator.resetError();
    popup.open(event)
  })
})