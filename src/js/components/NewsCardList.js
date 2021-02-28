
import { preloader} from '../constants/constants';

class NewsCardList {
  constructor(container, createArticle, getArticles ) {
    this.container = container;
    this.createArticle = createArticle;
    this.getArticles = getArticles;
    this.articles = [];

    this.render = this.render.bind(this);
    this.addArticle = this.addArticle.bind(this);
    this.getSaveArticle = this.getSaveArticle.bind(this);
    this.more = this.more.bind(this);
    this.renderLoading = this.renderLoading.bind(this);
  }

  renderLoading(isLoading) {
    if (isLoading) {
      preloader.classList.add('preloader_visible');
    } else {
      preloader.classList.remove('preloader_visible');
    }
  }

  addArticle(data) {
    this.container.append(this.createArticle(data));
  }

  render(articles) {
    this.articlesArr = articles;
    const initArr = articles.slice(0, 3);
    initArr.forEach(data => {
      this.addArticle(data)
    });
  }

  getSaveArticle() {
    this.getArticles()
    .then((data) => {
      const card = data.article
      for (let i of card){
        this.addArticle(i)
      }
      
    }).catch((err) => {
      alert(err);
    })
  }

  more() {
    let newArr = this.articles.splice(4, 3);
    newArr.forEach((data) => {
      this.addArticle(data);
    });
  }
}

export default NewsCardList;
