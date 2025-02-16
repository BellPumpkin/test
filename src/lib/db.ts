import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI as string);

export async function getBooks() {
  try {
    // MongoDB에 연결
    await client.connect();
    const collection = client.db("test").collection("test");

    // MongoDB에서 모든 책 데이터 가져오기
    const books = await collection.find().toArray();
    return books;
  } catch (error) {
    console.error("❌ MongoDB 연결 실패:", error);
    throw new Error("데이터를 가져올 수 없습니다.");
  } finally {
    // 연결 닫기
    await client.close();
  }
}


export async function getBookDetail(id: string) {
  await client.connect();
  const collection = client.db("test").collection("test");
  
  return collection.findOne({ id: parseInt(id) });
}
