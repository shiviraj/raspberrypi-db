// @ts-ignore
import {PiClient} from "raspberrypi-db"

// Connection URL
const url = 'http://shiviraj@localhost:27017';
const client: PiClient = new PiClient(url);

// Database Name
const dbName = 'myProject';

async function main() {
    // Use connect method to connect to the server
    client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);

    // create or get collection
    const collection = db.collection('documents');

    // insert many in collection
    await collection.insertMany([{"name": "shiviraj"}])

    // find all from the collection
    console.log(await collection.find({"name": "shiviraj"}))
    console.log(await collection.find({"invalid": "shiviraj"}), "invalid key for find many")

    // find-one
    console.log(await collection.findOne({"name": "shiviraj"}), "find one")
    console.log(await collection.findOne({"name": "unknown"}) || null, "find one unknown")
    console.log(await collection.findOne({"invalid": "unknown"}) || null, "find one with invalid key")


    return 'done.';
}

main()
    .then(console.log)
    .catch(console.error)
