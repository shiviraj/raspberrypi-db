import {DB} from "./db";

class PiClient {
    private fullUrl: string;
    url?: string;
    auth: string = "";
    private isConnected: boolean = false;

    constructor(url: string) {
        this.fullUrl = url
    }

    connect(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            try {
                const [protocol, url] = this.fullUrl.split("//")
                const [baseUrl, auth = ""] = url.split("@").reverse()
                this.url = protocol + baseUrl
                this.auth = auth
                this.isConnected = true
                resolve(true)
            } catch (e) {
                reject(false)
            }
        })
    }

    db(databaseName: string): DB {
        return new DB(databaseName, this)
    }
}

export {PiClient}
