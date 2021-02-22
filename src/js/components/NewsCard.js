import { dataFormat } from '../utils/function'

class NewsCard {
  constructor() {

    this.createCard = this.createCard.bind(this)
  }

  createCard(article) {
    const markCard = `
    <div class="card">
      <figure class="card__header">
        <img class="card__img" src="${article.urlToImage}" alt="фото статьи">
        <div class="card__interactive">
        <button class="button button__auth-on">Войдите, чтобы сохранять статьи</button>
        <button class="button button__bookmark"></button>
        </div>
      </figure>
      <a href="${article.url}" class="card__content">
      <p class="card__date">${article.publishedAt}</p>
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

  saveCard() {

  }
}
export default NewsCard