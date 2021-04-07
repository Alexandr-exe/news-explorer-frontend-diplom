class NewsApi {
  constructor(server) {
    this.server = server;
  }

  getApi(keyword) {
    const today = new Date();
    const weekInMS = 604800000;
    const lastweek = new Date(today.getTime() - weekInMS);
    const startDate = lastweek.toISOString().slice(0, 10);
    const finalDate = today.toISOString().slice(0, 10);
    return fetch(
      `${this.server}v2/everything?q=${keyword}&from=${startDate}&to=${finalDate}&apiKey=456818c5c7254c318b1cd985b6c20982&pageSize=100`
    ).then((res) => this._returnJson(res));
  }

  _returnJson(res)  {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  };
}

export default NewsApi