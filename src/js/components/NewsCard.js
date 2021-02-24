import { dataFormat } from '../utils/function';
import { imageUrl } from '../constants/constants';


class NewsCard {
  constructor(openend, search, api) {
    this.openend = openend
    this.search = search
    this.api = api


    
    this.createCard = this.createCard.bind(this);
    this.setEventListeners = this.setEventListeners.bind(this);
  }

  createCard(article) {
    const image = article.urlToImage === null ? imageUrl : article.urlToImage;
    const markCard = `
    <div class="card">
      <figure class="card__header">
        <img class="card__img" src="${image}" alt="фото статьи">
        <div class="card__interactive">
        <button class="button button__auth-on button_hidden" data-modal="auth">Войдите, чтобы сохранять статьи</button>
        <button class="button button__book-unmark"></button>
        <button class="button button__book-mark button_hidden"></button>
        </div>
      </figure>
      <a href="${article.url}" class="card__content">
      <p class="card__date">${dataFormat(article.publishedAt.slice(0, 10))}</p>
      <p class="card__title">${article.title}</p>
      <p class="card__text">${article.description}</p>
      <p class="card__sourse">${article.source.name}</p>
      </a>
    </div>`

    const fragment = document.createElement('div');
    fragment.insertAdjacentHTML('afterbegin', markCard);

    this.element = fragment.firstElementChild;
    return fragment.firstElementChild;
  }

  _saveCard() {
    this.api.getUser()
      .then((res) => {
        if (res != undefined) {
          this.element.querySelector('.button__book-unmark').classList.add('button_hidden');
          this.element.querySelector('.button__book-mark').classList.remove('button_hidden');
          const articleData = {
            keyword: this.search.value,
            title: this.data.title,
            text: this.data.description,
            date: this.data.publishedAt,
            source: this.data.source.name,
            link: this.data.url,
            image: this.data.urlToImage
          };
          this.api.postArticle(articleData)
            .then((res) => {
              this.articleID = res.data._id;
            })
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  
}

setEventListeners() {
  this.element.querySelector('.button__auth-on').addEventListener('click', this.openend)
  this.element.querySelector('.button__book-mark').addEventListener('click', this._saveCard)
}
}

export default NewsCard