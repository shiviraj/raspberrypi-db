import {PiClient} from "raspberrypi-db"

// Connection URL
const url = 'http://shiviraj@localhost:27017';
const client = new PiClient(url);

// Database Name
const dbName = 'myProject';

async function main() {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('documents');
    await collection.insertMany([{"name": "shivi"}])
    const data = await collection.findAll()
    console.log(data)
    return 'done.';
}

main()
    .then(console.log)
    .catch(console.error)
