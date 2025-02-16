// /app/api/books/route.ts
import { NextResponse } from "next/server";
import { getBooks, addBook } from "@/lib/db";

export const revalidate = 0;

// GET 요청을 처리하여 책 목록을 반환하는 API 라우트
export async function GET() {
  try {
    const books = await getBooks();  // MongoDB에서 책 목록을 가져옴
    return NextResponse.json(books);  // JSON 형식으로 클라이언트에 반환
  } catch {
    return NextResponse.json(
      { error: "❌ 책 목록을 가져오는 데 실패했습니다." },
      { status: 500 }  // 오류 발생 시 500 상태 코드와 함께 에러 메시지 반환
    );
  }
}

export async function POST(request: Request) {
  try {
    const book = await request.json();

    // 필수 값이 누락된 경우
    if (!book.title || !book.author || !book.price) {
      return NextResponse.json(
        { error: "❌ 모든 필수 필드를 입력하세요." },
        { status: 400 }
      );
    }

    const newBook = await addBook(book); // 책 추가
    return NextResponse.json(newBook, { status: 201 }); // 성공 응답 (201 Created)
  } catch (error) {
    console.error("❌ 책 추가 실패:", error);
    return NextResponse.json(
      { error: "❌ 책을 추가하는 데 실패했습니다." },
      { status: 500 }
    );
  }
}