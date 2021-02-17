class MainApi {
  constructor(server) {
    this.server = server;
  }

  signUp = ({ email, password, name }) => {
    return fetch(`${this.server}signup`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, name }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return res.json().then(Promise.reject.bind(Promise));
    });
  };

  signIn = ({ email, password }) => {
    return fetch(`${this.server}signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    })
  }
  getUser() {
    return fetch(`${this.server}users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        const json = res.json();
        return json.then(Promise.reject.bind(Promise));
      })
      .catch((err) => {
        return undefined;
      });
  }

  unlogin = () => {
    return fetch(`${this.server}exit`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({ email: '', password: '' }),
    });
  };

  getArticles = () => {
    return fetch(`${this.server}articles`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
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
  };

  createArticle = (saveData) => {
    return fetch(`${this.server}articles`, {
      method: 'POST',
      credentials: 'include',
      headers: this.headers,
      body: JSON.stringify({
        keyword: saveData.keyword,
        title: saveData.title,
        text: saveData.text,
        date: saveData.date,
        source: saveData.source,
        link: saveData.link,
        image: saveData.image,
      }),
    }).then((res) => this._returnJson(res));
  };

  postArticle = (articleData) => {
    return fetch(`${this.server}articles`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        keyword: articleData.keyword,
        title: articleData.title,
        text: articleData.text,
        date: articleData.date,
        source: articleData.source,
        link: articleData.link,
        image: articleData.image
      }),
    }).then(res => {
      if (res.ok) {
        return res.json()
      }
      const json = res.json();
      return json.then(Promise.reject.bind(Promise))
    })
      .catch((err) => { throw err; })
  }

  deleteCard = (id) => {
    return fetch(`${this.server}articles/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this.headers,
      body: JSON.stringify({
        id: id,
      }),
    }).then((res) => this._returnJson(res));
  };

  _returnJson(res) {
    if (!res.ok) {
      return Promise.resolve(res.json());
    }
    return res.json();
  }
}
export default MainApi