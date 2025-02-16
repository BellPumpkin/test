import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI as string);

export async function getBooks() {
  await client.connect();
  const collection = client.db('test').collection('test');
  return collection.find().toArray();
}

export async function getBookDetail(id: string) {
  await client.connect();
  const collection = client.db("test").collection("test");
  
  return collection.findOne({ id: parseInt(id) });
}

export async function addBook(book: { id: number, title: string, content: string, author: string; price: number, count: number }) {
  const newBook = { ...book };
  await client.connect();
  const collection = client.db("test").collection("test");
  const result = await collection.insertOne(newBook);
  return { _id: result.insertedId, ...newBook };
}

export async function deleteBook(id: string) {
  await client.connect();
  const collection = client.db("test").collection("test");
  await collection.deleteOne({id: parseInt(id)});
  return { message: '책이 성공적으로 삭제되었습니다.' };
}