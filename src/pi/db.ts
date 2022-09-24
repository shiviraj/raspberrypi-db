import {PiClient} from "./piClient";
import {Collection} from "./collection";
import {DatabaseAPI} from "../api/database"
import {Document} from "../api/collection";

class DB {
  readonly databaseName: string;
  piClient: PiClient;
  private databaseApi: DatabaseAPI<Document>;

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

  collection<T>(collectionName: string) {
    return new Collection<T>(collectionName, this)
  }

  dropDatabase(): Promise<Document> {
    return this.databaseApi.drop()
  }
}

export {DB}