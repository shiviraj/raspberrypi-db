import {PiClient} from "./piClient";
import {Collection} from "./collection";
import {DatabaseAPI} from "../api/database"

class DB {
    readonly databaseName: string;
    piClient: PiClient;

    constructor(databaseName: string, piClient: PiClient) {
        this.databaseName = databaseName
        this.piClient = piClient
        const databaseApi = new DatabaseAPI(piClient.url!, {
            authorization: piClient.auth!,
            databasename: databaseName,
            collectionname: ""
        })
        databaseApi.create().catch()
    }

    collection(collectionName: string) {
        return new Collection(collectionName, this)
    }
}

export {DB}