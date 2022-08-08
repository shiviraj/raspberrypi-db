import adapter, {Config} from './adapter';
import {Headers} from "./adapter"

class CollectionAPI {
    private readonly baseUrl: string;
    private readonly fetch: (url: string, config?: Config) => Promise<Map<string, any> | Array<any>>;

    constructor(baseUrl: string, headers: Headers) {
        this.fetch = adapter(headers).fetch
        this.baseUrl = baseUrl
    }

    create() {
        const options: Config = {method: 'POST'};
        return this.fetch(`${this.baseUrl}/create/collection`, options);
    }

    insertMany(collections: Array<Map<string, any>>): Promise<Array<any>> {
        const options: Config = {method: 'POST', data: collections};
        return this.fetch(`${this.baseUrl}/insert-many`, options) as Promise<Array<any>>
    }

    insertOne(collection: Map<string, any>): Promise<Map<string, any>> {
        const options: Config = {method: 'POST', data: collection};
        return this.fetch(`${this.baseUrl}/insert-one`, options) as Promise<Map<string, any>>
    }

    findAll(): Promise<Array<any>> {
        const options: Config = {method: 'POST'};
        return this.fetch(`${this.baseUrl}/find-all`, options) as Promise<Array<any>>
    }
}

export {CollectionAPI};
