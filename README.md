# raspberrypi-db

### How to use

- You need to start raspberrypi-db-server [click here](https://github.com/shiviraj/raspberrypi-db-server#readme) to know how to start raspberrypi-db-server.
- you need to install raspberrypi-db by using `npm i raspberrypi-db` and use it into your project. 

## Example

```javascript
const {PiClient} = require("raspberrypi-db")

// Connection URL 
const url = 'http://{AUTH_KEY}@localhost:27017';
// example: http://shiviraj@localhost:27017

const client = new PiClient(url);

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
```