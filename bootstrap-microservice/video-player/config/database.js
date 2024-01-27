const { MongoClient } = require("mongodb");

const url = process.env.DATABASE_URL;
const name = process.env.DATABASE_NAME;

const client = new MongoClient(url);

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const collection = db.collection("documents");

  // the following code examples can be pasted here...

  return "done.";
}

// Database Name
const dbName = "myProject";

module.exports = client;
