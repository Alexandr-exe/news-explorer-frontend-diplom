class MainApi {
  constructor(server) {
    this.server = server;

    this.signUp = this.signUp.bind(this);
    this.signIn = this.signIn.bind(this);
    this.getUser = this.getUser.bind(this);
    this.unlogin = this.unlogin.bind(this);
    this.getArticles = this.getArticles.bind(this);
    this.createArticle = this.createArticle.bind(this);
    this.removeArticle = this.removeArticle.bind(this);
    this._returnJson = this._returnJson.bind(this);
  }

  signUp(email, password, name) {
    return fetch(`${this.server}signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        email,
        password,
        name
      }),
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        const json = res.json();
        return json.then(Promise.reject.bind(Promise))
      })
      .catch((err) => {
        console.log(err)
      })
  }

  signIn(email, password) {
    return fetch(`${this.server}signin`, {
      method: 'POST',
      headers: this.headers,
      credentials: 'include',
      body: JSON.stringify({
        email,
        password
      }),
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        const json = res.json();
        return json.then(Promise.reject.bind(Promise))
      })
      .catch((err) => {
        console.log(err);
      })
  }

  getUser() {
    return fetch(`${this.server}users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        const json = res.json();
        return json.then(Promise.reject.bind(Promise));
      })
      .catch((err) => {
        throw err;
      });
  }

  removeArticle(id) {
    return fetch(`${this.server}articles/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        const json = res.json();
        return json.then(Promise.reject.bind(Promise))
      })
      .catch((err) => {
        alert(err);
      })
  }

  unlogin() {
    return fetch(`${this.server}exit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        // const json = res.json();
        // return json.then(Promise.reject.bind(Promise))
      })
  };

  getArticles() {
    return fetch(`${this.server}articles/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
 
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        const json = res.json();
        return json.then(Promise.reject.bind(Promise))
      })
      .catch((err) => {
        throw err;
      })
  }

  createArticle(card) {
    return fetch(`${this.server}articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        keyword: card.keyword,
        title: card.title,
        text: card.text,
        date: card.date,
        source: card.source,
        link: card.link,
        image: card.image
      }),

    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        const json = res.json();
        return json.then(Promise.reject.bind(Promise))
      })
      .catch((err) => {
        throw err;
      })
  }

  _returnJson(res) {
    if (!res.ok) {
      return Promise.resolve(res.json());
    }
    return res.json();
  }
}
export default MainApi