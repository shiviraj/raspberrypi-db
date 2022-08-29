import {PiClient} from "./piClient";
import {Collection, Document} from "./collection";
import {DatabaseAPI} from "../api/database"

class DB {
  readonly databaseName: string;
  piClient: PiClient;
  private databaseApi: DatabaseAPI;

  constructor(databaseName: string, piClient: PiClient) {
    this.databaseName = databaseName
    this.piClient = piClient
    this.databaseApi = new DatabaseAPI(piClient.url!, {
      authorization: piClient.auth!,
      databasename: databaseName,
      collectionname: ""
    })
    this.databaseApi.create().catch()
  }

  collection(collectionName: string) {
    return new Collection(collectionName, this)
  }

  dropDatabase(): Promise<Document> {
    return this.databaseApi.drop()
  }
}

export {DB}