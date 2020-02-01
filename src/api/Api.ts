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
  static post() {}
  static put() {}
  static delete() {}
}
