import adapter, {Config, Headers} from './adapter';
import {Document} from "../pi/collection";

class CollectionAPI {
  private readonly baseUrl: string;
  private readonly fetch: (url: string, config?: Config) => Promise<Document | Array<Document>>;

  constructor(baseUrl: string, headers: Headers) {
    this.fetch = adapter(headers).fetch
    this.baseUrl = baseUrl
  }

  create(): Promise<Document> {
    const options: Config = {method: 'POST'};
    return this.fetch(`${this.baseUrl}/collection`, options) as Promise<Document>;
  }

  drop(): Promise<Document> {
    const options: Config = {method: 'DELETE'};
    return this.fetch(`${this.baseUrl}/collection`, options) as Promise<Document>;
  }

  insertMany(collections: Array<Document>): Promise<Document> {
    const options: Config = {method: 'POST', data: {payload: collections}};
    return this.fetch(`${this.baseUrl}/insert-many`, options) as Promise<Document>
  }

  insertOne(collection: Document): Promise<Document> {
    const options: Config = {method: 'POST', data: {payload: collection}};
    return this.fetch(`${this.baseUrl}/insert-one`, options) as Promise<Document>
  }

  find(query: Document): Promise<Array<Document>> {
    const options: Config = {method: 'POST', data: {payload: query}};
    return this.fetch(`${this.baseUrl}/find`, options) as Promise<Array<Document>>
  }

  findOne(query: Document, exact: boolean = true): Promise<Document | null> {
    const options: Config = {method: 'POST', data: {payload: {query, exact}}};
    return this.fetch(`${this.baseUrl}/find-one`, options) as Promise<Document | null>
  }

  updateOne(query: Document, document: Document) {
    const options: Config = {method: 'PUT', data: {payload: {query, document}}};
    return this.fetch(`${this.baseUrl}/update-one`, options) as Promise<Document | null>
  }

  updateMany(query: Document, document: Document): Promise<Array<Document>> {
    const options: Config = {method: 'PUT', data: {payload: {query, $set: document}}};
    return this.fetch(`${this.baseUrl}/update-many`, options) as Promise<Array<Document>>
  }

  deleteOne(query: Document, document: Document) {
    const options: Config = {method: 'DELETE', data: {payload: {query, document}}};
    return this.fetch(`${this.baseUrl}/delete-one`, options) as Promise<Document | null>
  }

  deleteMany(query: Document, document: Document): Promise<Array<Document>> {
    const options: Config = {method: 'DELETE', data: {payload: {query, $set: document}}};
    return this.fetch(`${this.baseUrl}/delete-many`, options) as Promise<Array<Document>>
  }
}

export {CollectionAPI};
