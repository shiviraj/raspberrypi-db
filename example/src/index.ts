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
    const data = await collection.findAll()
    console.log(data)
    return 'done.';
}

main()
    .then(console.log)
    .catch(console.error)
