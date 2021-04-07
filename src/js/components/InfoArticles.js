class InfoArticles {
  constructor(container, getUser, getArticles) {
    this.container = container;
    this.getUser = getUser;
    this.getArticles = getArticles;

    this.renderContext = this.renderContext.bind(this)
  }


  renderContext() {
    const array = []
    const name = this.container.querySelector('#main-name');
    const quantity = this.container.querySelector('#main-quantity');
    const nameArray = this.container.querySelector('#main-name-array');
    const and = this.container.querySelector('#main-and');
    const more = this.container.querySelector('#main-more');

    this.getUser()
      .then(data => {
        name.textContent = data.name;
      });

    this.getArticles()
      .then((data) => {
        console.log(data.article)
        quantity.textContent = data.article.length;
        data.article.forEach((item) => {
          array.push(item.keyword);
        })
        const keyword = [...new Set(array)];

        console.log(keyword.length)
        if (keyword.length <= 2) {
          nameArray.textContent = keyword.splice(0, 2);
          and.classList.add('main__text_hidden')
          more.classList.add('main__text_hidden')
        }
        if (keyword.length === 3) {
          nameArray.textContent = keyword.splice(0, 2);
          more.textContent = '1 другому'
        }
        if (keyword.length > 3) {
          const number = keyword.length - 2
          nameArray.textContent = keyword.splice(0, 2);
          more.textContent = `${number} другим`
        }

      })
  }

}
export default InfoArticles