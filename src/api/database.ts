import adapter, {Config, Headers} from './adapter';
import {Document} from "./collection";

class DatabaseAPI<T extends Document> {
  private readonly baseUrl: string;
  private readonly fetch: <S>(url: string, config?: Config) => Promise<S>;

  constructor(baseUrl: string, headers: Headers) {
    this.fetch = adapter(headers).fetch
    this.baseUrl = baseUrl
  }

  create(): Promise<T> {
    const options: Config = {method: 'POST'};
    return this.fetch<T>(`${this.baseUrl}/database`, options)
  }

  drop(): Promise<T> {
    const options: Config = {method: 'DELETE'};
    return this.fetch<T>(`${this.baseUrl}/database`, options)

  }
}

export {DatabaseAPI};
