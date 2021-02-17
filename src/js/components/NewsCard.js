import dataFormat from '../utils/function'

class NewsCard {
  constructor() {

    this.create = this.create.bind(this)
  }
  create(article) {
    const markCard = `
    <div class="card">
      <figure class="card__header">
        <img class="card__img" src="<%=require('${article.img}')%>" alt="фото статьи">
        <div class="card__interactive">
        <button class="button button__auth-on">Войдите, чтобы сохранять статьи</button>
        <button class="button button__bookmark"></button>
        </div>
      </figure>
      <a href="#" class="card__content">
      <p class="card__date">${article.date}</p>
      <p class="card__title">${article.title}</p>
      <p class="card__text">${article.text}</p>
      <p class="card__sourse">${article.sourse}</p>
      </a>
    </div>`

    const fragment = document.createElement('div');
    fragment.insertAdjacentHTML('afterbegin', markCard);

    this.element = fragment.firstElementChild;
    return fragment.firstElementChild;
  }
}
export default NewsCard