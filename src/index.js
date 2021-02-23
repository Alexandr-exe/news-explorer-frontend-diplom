import './styles/index.css';
import './js/config/config';
import Popup from './js/components/Popup';
import NewsApi from './js/api/NewsApi';
import NewsCard from './js/components/NewsCard';
import NewsCardList from './js/components/NewsCardList';
import { newsApiServer } from './js/config/config';

const body = document.getElementById('body');
const buttons = document.querySelectorAll('.button_popup');
const crosses = document.querySelectorAll('.popup__close');
const resultSearch = document.querySelector('.result-search__card');
const more = document.querySelector('.button__more')
const preloader = document.querySelector('.preloader')

const searchForm = document.forms.search
const { search } = searchForm.elements

const popup = new Popup(body, crosses);
const newsApi = new NewsApi(newsApiServer);
const newsCard = new NewsCard();
const newsCardList = new NewsCardList(resultSearch, newsCard.createCard, preloader);



function renderSearch(event){
  event.preventDefault()
  newsCardList.clearArticle()
  newsCardList.renderLoading(true)
  newsApi.getApi(search.value)
    .then(res => {
      if (res.articles.length == 0) {
        document.querySelector('.result-search__fail').classList.add('result-search__fail_visible')
        document.querySelector('.result-search__positive').classList.remove('result-search__positive_visible')
      } else {
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
    popup.open(event)
  })
})