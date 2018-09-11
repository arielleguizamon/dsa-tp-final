import axios from "axios";

const BACKEND_HOST = "http://localhost:3000/api";

const CLIENT_DEFAULTS = {
  baseURL: BACKEND_HOST,
  timeout: 6000
};

class HttpClient {
  client;

  constructor() {
    this.client = axios.create(CLIENT_DEFAULTS);

    this.request = this.request.bind(this);
    this.get = this.get.bind(this);
    this.post = this.post.bind(this);
    this.put = this.put.bind(this);
    this.delete = this.delete.bind(this);
  }

  request(config) {
    return this.client.request(config);
  }

  get(url, config) {
    return this.client.get(url, config);
  }

  post(url, data, config) {
    return this.client.post(url, data, config);
  }

  put(url, data, config) {
    return this.client.put(url, data, config);
  }

  delete(url, data, config) {
    return this.client.put(url, data, config);
  }
}

const httpClient = new HttpClient();

export default httpClient;
