export default class Api {
  private static url(endpoint: string) {
    return `http://localhost:5000${endpoint}`;
  }
  static get(endpoint: string): Promise<any> {
    return fetch(this.url(endpoint))
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error();
        }
      })
      .catch(error => console.log(error));
  }
  static post(endpoint: string, body: object) {
    return fetch(this.url(endpoint), {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *client
      body: JSON.stringify(body) // body data type must match "Content-Type" header
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error();
        }
      })
      .catch(error => console.log(error));
  }
  static put() {}
  static delete() {}
}
