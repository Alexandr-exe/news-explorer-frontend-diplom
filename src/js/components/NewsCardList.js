class NewsCardList {
  constructor(container, createArticle) {
    this.container = container
    this.createArticle = createArticle
    this.articles = []

    this.render = this.render.bind(this)
    this.addArticle = this.addArticle.bind(this)
    this.more = this.more.bind(this)
  }

  clearArticle(){
    this.container.innerHTML = ""
  }

  addArticle(data) {
    this.container.append(this.createArticle(data))
  }

  render(articles) {
    this.articles = articles;
    const initArr = articles.slice(0, 3);
    for (let i of initArr) {
      this.addArticle(i)
    }
  }

  more() {
    let newArr = this.articles.splice(4, 3); 
    newArr.forEach(data => {
      this.addArticle(data)
    });
  }
}
export default NewsCardList