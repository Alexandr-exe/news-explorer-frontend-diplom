import { dataFormat } from '../utils/function';
import { imageUrl, search } from '../constants/constants';

class NewsCard {
  constructor(api) {
    this.api = api

    this.createCard = this.createCard.bind(this);
    this._saveArticle = this._saveArticle.bind(this);
    this.createSaveArticle = this.createSaveArticle.bind(this);
    this._removeCard = this._removeCard.bind(this);
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
      <a href="${article.url}" target="_blank" class="card__content">
      <p class="card__date">${dataFormat(article.publishedAt.slice(0, 10))}</p>
      <p class="card__title">${article.title}</p>
      <p class="card__text">${article.description}</p>
      <p class="card__sourse">${article.source.name}</p>
      </a>
    </div>`;

    const fragment = document.createElement('div');
    fragment.insertAdjacentHTML('afterbegin', markCard);
    return this.element = fragment.firstElementChild;
  }

  _saveArticle() {
    const buttonMark = this.element.querySelector('.button__book-mark')
    const buttonUnmark = this.element.querySelector('.button__book-unmark')
    const article = {
      keyword: search.value,
      title: this.element.querySelector('.card__title').textContent,
      text: this.element.querySelector('.card__text').textContent,
      date: this.element.querySelector('.card__date').textContent,
      source: this.element.querySelector('.card__sourse').textContent,
      link: this.element.querySelector('.card__content').getAttribute('href'),
      image: this.element.querySelector('.card__img').getAttribute('src')
    }
    this.api.createArticle(article).then((data) => {
      if (data !== undefined) {
        buttonUnmark.classList.add('button_hidden');
        buttonMark.classList.remove('button_hidden');
      }
    }).catch((e) => {
      console.log(e);
    })

  }

  createSaveArticle(article) {
    const image = article.image === null ? imageUrl : article.image;
    const markUp = `
        <div class="card">
          <figure class="card__header">
            <img class="card__img" src="${image}" alt="фото статьи">
            <div class="card__interactive">
              <span class="card__tag">${article.keyword}</span>
              <button class="button button__delete"></button>
            </div>
          </figure>
          <a href="${article.link}" class="card__content">
            <p class="card__date">${article.date}</p>
            <p class="card__title">${article.title}</p>
            <p class="card__text">${article.text}</p>
            <p class="card__sourse">${article.source}</p>
          </a>
        </div>
    `
    const fragment = document.createElement('div');
    fragment.insertAdjacentHTML('afterbegin', markUp)
    this.element = fragment.firstElementChild
    this.element.id = article._id
    return this.element
  }

  _removeCard(event) {
    if (event.target.classList.contains('button__delete')) {
      if (confirm("Вы уверены, что хотите удалить cтатью?")) {
        const card = event.target.closest('.card');
        this.api.removeArticle(card.id).then((data) => {
          
          if (data !== undefined) {
            card.remove();
          }
        })
          .catch((err) => {
            alert(err);
          });
      }}
  }


  setEventListeners() {
    this.element.querySelector('.button__book-unmark').addEventListener('click', this._saveArticle);
  }
}

export default NewsCard;
