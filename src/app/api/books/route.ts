// /app/api/books/route.ts
import { NextResponse } from "next/server";
import { getBooks } from "@/lib/db";

// GET 요청을 처리하여 책 목록을 반환하는 API 라우트
export async function GET() {
  try {
    const books = await getBooks();  // MongoDB에서 책 목록을 가져옴
    return NextResponse.json(books);  // JSON 형식으로 클라이언트에 반환
  } catch (error) {
    return NextResponse.json(
      { error: "❌ 책 목록을 가져오는 데 실패했습니다." },
      { status: 500 }  // 오류 발생 시 500 상태 코드와 함께 에러 메시지 반환
    );
  }
}