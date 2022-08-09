import adapter, {Config} from './adapter';
import {Headers} from "./adapter"
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
        return this.fetch(`${this.baseUrl}/create/collection`, options) as Promise<Document>;
    }

    insertMany(collections: Array<Document>): Promise<Array<Document>> {
        const options: Config = {method: 'POST', data: {payload: collections}};
        return this.fetch(`${this.baseUrl}/insert-many`, options) as Promise<Array<Document>>
    }

    insertOne(collection: Document): Promise<Document> {
        const options: Config = {method: 'POST', data: {payload: collection}};
        return this.fetch(`${this.baseUrl}/insert-one`, options) as Promise<Document>
    }

    findAll(): Promise<Array<Document>> {
        const options: Config = {method: 'POST'};
        return this.fetch(`${this.baseUrl}/find-all`, options) as Promise<Array<Document>>
    }
}

export {CollectionAPI};
