class NewsCardList {
  constructor(container, createArticle, preloader) {
    this.container = container;
    this.createArticle = createArticle;
    this.preloader = preloader;
    this.articles = [];

    this.render = this.render.bind(this);
    this.more = this.more.bind(this);
    this.renderLoading = this.renderLoading.bind(this);
  }

  clearArticle() {
    this.container.innerHTML = '';
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this.preloader.classList.add('preloader_visible');
    } else {
      this.preloader.classList.remove('preloader_visible');
    }
  }

  addArticle(data) {
    this.container.append(this.createArticle(data));
  }

  render(articles) {
    this.articles = articles;
    const initArr = articles.slice(0, 3);
    for (let i of initArr) {
      this.addArticle(i);
    }
  }

  more() {
    let newArr = this.articles.splice(4, 3);
    newArr.forEach((data) => {
      this.addArticle(data);
    });
  }
}

export default NewsCardList;
