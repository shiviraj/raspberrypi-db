import {DB} from "./db";
import {CollectionAPI} from "../api/collection"

class Collection {
    private readonly collectionName: string;
    private db: DB;
    private collectionAPI: CollectionAPI;

    constructor(collectionName: string, db: DB) {
        this.collectionName = collectionName
        this.db = db
        const piClient = this.db.piClient
        this.collectionAPI = new CollectionAPI(piClient.url!, {
            authorization: piClient.auth!,
            collectionname: this.collectionName,
            databasename: this.db.databaseName
        })
        this.collectionAPI.create().catch()
    }

    insertMany(collections: Array<Map<string, any>>) {
        return this.collectionAPI.insertMany(collections)
    }

    insertOne(collection: Map<string, any>): Promise<Map<string, any>> {
        return this.collectionAPI.insertOne(collection)
    }

    findAll(): Promise<Array<any>> {
        return this.collectionAPI.findAll()
    }
}

export {Collection}