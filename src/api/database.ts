import adapter, {Config, Headers} from './adapter';
import {Document} from "../pi/collection";

class DatabaseAPI {
  private readonly baseUrl: string;
  private readonly fetch: (url: string, config?: Config) => Promise<Map<string, any> | Array<any>>;

  constructor(baseUrl: string, headers: Headers) {
    this.fetch = adapter(headers).fetch
    this.baseUrl = baseUrl
  }

  create(): Promise<Document> {
    const options: Config = {method: 'POST'};
    return this.fetch(`${this.baseUrl}/database`, options) as Promise<Document>;
  }

  drop(): Promise<Document> {
    const options: Config = {method: 'DELETE'};
    return this.fetch(`${this.baseUrl}/database`, options) as Promise<Document>;

  }
}

export {DatabaseAPI};
