import {DB} from "./db";
import {CollectionAPI, Document} from "../api/collection"

class Collection<T extends Document> {
  private readonly collectionName: string;
  private db: DB;
  private collectionAPI: CollectionAPI<T>;

  constructor(collectionName: string, db: DB) {
    this.collectionName = collectionName
    this.db = db
    const piClient = this.db.piClient
    this.collectionAPI = new CollectionAPI<T>(piClient.url!, {
      authorization: piClient.auth!,
      collectionname: this.collectionName,
      databasename: this.db.databaseName
    })
    this.collectionAPI.create().catch()
  }

  insertMany(collections: Array<T>): Promise<Array<T>> {
    return this.collectionAPI.insertMany(collections)
  }

  insertOne(collection: T): Promise<T> {
    return this.collectionAPI.insertOne(collection)
  }

  find(query: Document): Promise<Array<T>> {
    return this.collectionAPI.find(query)
  }

  findOne(query: Document): Promise<T | null> {
    return this.collectionAPI.findOne(query)
  }

  findById(_id: String): Promise<T | null> {
    return this.collectionAPI.findOne({_id}, false)
  }

  updateMany(query: Document, document: { $set: T }): Promise<Array<T>> {
    return this.collectionAPI.updateMany(query, document.$set)
  }

  updateOne(query: Document, document: T): Promise<T | null> {
    return this.collectionAPI.updateOne(query, document)
  }

  updateById(_id: string, document: T): Promise<T | null> {
    return this.collectionAPI.updateOne({_id}, document)
  }

  deleteMany(query: Document, document: { $set: T }): Promise<Array<T>> {
    return this.collectionAPI.deleteMany(query, document.$set)
  }

  deleteOne(query: Document, document: T): Promise<T | null> {
    return this.collectionAPI.deleteOne(query, document)
  }

  deleteById(_id: string, document: T): Promise<T | null> {
    return this.collectionAPI.deleteOne({_id}, document)
  }

  dropCollection(): Promise<Document> {
    return this.collectionAPI.drop()
  }
}

export {Collection}