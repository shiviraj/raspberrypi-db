import adapter, {Config} from './adapter';
import {Headers} from "./adapter";

class DatabaseAPI {
    private readonly baseUrl: string;
    private readonly fetch: (url: string, config?: Config) => Promise<Map<string, any> | Array<any>>;

    constructor(baseUrl: string, headers: Headers) {
        this.fetch = adapter(headers).fetch
        this.baseUrl = baseUrl
    }

    create() {
        const options: Config = {method: 'POST'};
        return this.fetch(`${this.baseUrl}/create/database`, options);
    }
}

export {DatabaseAPI};
