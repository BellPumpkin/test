import { NextResponse } from "next/server";
import { getBookDetail, deleteBook } from "@/lib/db";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {

    const id = (await params).id
    const book = await getBookDetail(id); // MongoDB에서 책 디테일 정보를 가져옴

    if (!book) {
        return NextResponse.json(
        { error: "❌ 책을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    return NextResponse.json(book); // 책 정보를 JSON 형식으로 반환
  } catch (error) {
      console.error("❌ 책 정보를 가져오는 중 오류 발생:", error);
      return NextResponse.json(
        { error: "❌ 책 정보를 가져오는 데 실패했습니다." },
        { status: 500 }
      );
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id
  
  try {
    // 데이터베이스에서 책을 삭제하는 로직 (예시)
    const deletedBook = await deleteBook(id); // deleteBookFromDatabase는 데이터베이스에서 책을 삭제하는 함수입니다.

    if (!deletedBook) {
      return NextResponse.json({ error: '책을 찾을 수 없습니다.' }, { status: 404 });
    }

    return NextResponse.json({ message: '책이 성공적으로 삭제되었습니다.' }, { status: 200 });
  } catch (error) {
    console.error('책 삭제 중 오류 발생:', error);
    return NextResponse.json({ error: '책을 삭제하는 중 오류가 발생했습니다.' }, { status: 500 });
  }
}