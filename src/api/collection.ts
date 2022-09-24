import adapter, {Config, Headers} from './adapter';

export type Document = Record<string, any>

class CollectionAPI<T> {
  private readonly baseUrl: string;
  private readonly fetch: <S>(url: string, config?: Config) => Promise<S>;

  constructor(baseUrl: string, headers: Headers) {
    this.fetch = adapter(headers).fetch
    this.baseUrl = baseUrl
  }

  create(): Promise<Document> {
    const options: Config = {method: 'POST'};
    return this.fetch(`${this.baseUrl}/collection`, options)
  }

  drop(): Promise<Document> {
    const options: Config = {method: 'DELETE'};
    return this.fetch(`${this.baseUrl}/collection`, options)
  }

  insertMany(collections: Array<T>): Promise<Array<T>> {
    const options: Config = {method: 'POST', data: {payload: collections}};
    return this.fetch<Array<T>>(`${this.baseUrl}/insert-many`, options)
  }

  insertOne(collection: T): Promise<T> {
    const options: Config = {method: 'POST', data: {payload: collection}};
    return this.fetch<T>(`${this.baseUrl}/insert-one`, options)
  }

  find(query: Document): Promise<Array<T>> {
    const options: Config = {method: 'POST', data: {payload: query}};
    return this.fetch<Array<T>>(`${this.baseUrl}/find`, options)
  }

  findOne(query: Document, exact: boolean = true): Promise<T | null> {
    const options: Config = {method: 'POST', data: {payload: {query, exact}}};
    return this.fetch<T>(`${this.baseUrl}/find-one`, options)
  }

  updateOne(query: Document, document: T): Promise<T> {
    const options: Config = {method: 'PUT', data: {payload: {query, document}}};
    return this.fetch<T>(`${this.baseUrl}/update-one`, options)
  }

  updateMany(query: Document, document: T): Promise<Array<T>> {
    const options: Config = {method: 'PUT', data: {payload: {query, $set: document}}};
    return this.fetch<Array<T>>(`${this.baseUrl}/update-many`, options)
  }

  deleteOne(query: Document, document: T): Promise<T> {
    const options: Config = {method: 'DELETE', data: {payload: {query, document}}};
    return this.fetch<T>(`${this.baseUrl}/delete-one`, options)
  }

  deleteMany(query: Document, document: T): Promise<Array<T>> {
    const options: Config = {method: 'DELETE', data: {payload: {query, $set: document}}};
    return this.fetch<Array<T>>(`${this.baseUrl}/delete-many`, options)
  }
}

export {CollectionAPI};
