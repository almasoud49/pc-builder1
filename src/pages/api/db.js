import { MongoClient } from "mongodb";

const uri = process.env.DATABASE_URL;
const client = new MongoClient(uri);

export async function connectDatabase() {
  return client.db("pc_builder");
}

const db = await connectDatabase();
const productsCollection =  db.collection("products");

export default productsCollection;