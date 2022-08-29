import {DB} from "./db";
import {CollectionAPI} from "../api/collection"
import RaspberrypiServerError from "../api/RaspberrypiServerError";

export type Document = Record<string, any>

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

    insertMany(collections: Array<Document>): Promise<Document> {
        return this.collectionAPI.insertMany(collections as Array<Document>)
    }

    insertOne(collection: Document): Promise<Document> {
        return this.collectionAPI.insertOne(collection)
    }

    find(query: Document): Promise<Array<Document>> {
        return this.collectionAPI.find(query)
    }

    findOne(query: Document): Promise<Document | null> {
        return this.collectionAPI.findOne(query)
    }

    findById(_id: String): Promise<Document | null> {
        return this.collectionAPI.findOne({_id}, false)
    }

    updateMany(query: Document, document: { $set: Document }): Promise<Array<Document>> {
        return this.collectionAPI.updateMany(query, document.$set)
    }

    updateOne(query: Document, document: Document): Promise<Document | null> {
        return this.collectionAPI.updateOne(query, document)
    }

    updateById(_id: string, document: Document): Promise<Document | null> {
        return this.collectionAPI.updateOne({_id}, document)
    }

    deleteMany(query: Document, document: { $set: Document }): Promise<Array<Document>> {
        return this.collectionAPI.deleteMany(query, document.$set)
    }

    deleteOne(query: Document, document: Document): Promise<Document | null> {
        return this.collectionAPI.deleteOne(query, document)
    }

    deleteById(_id: string, document: Document): Promise<Document | null> {
        return this.collectionAPI.deleteOne({_id}, document)
    }

    dropCollection(): Promise<Document> {
        return this.collectionAPI.drop()
    }
}

export {Collection}