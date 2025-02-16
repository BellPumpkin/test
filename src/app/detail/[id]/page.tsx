"use client"
import React from 'react'
import { useQuery } from '@tanstack/react-query';

type Props = {
  params: Promise<{ id: string }>;
}

type BookProps = {
  id: string;
  title: string;
  author: string;
  price: string;
  count: number;
}

const fetchBookDetail = async (id: string) => {
  const res = await fetch(`/api/books/${id}`);
  if (!res.ok) {
    throw new Error('책 정보를 불러오는 데 실패했습니다.');
  }
  return res.json();
}

export default function DetailPage({ params }: Props) {
  const { id } = React.use(params);

  const { data, isLoading, isError, error } = useQuery<BookProps, Error>({
    queryKey: ['bookDetail', id],
    queryFn: () => fetchBookDetail(id),
  });

  return (
    <div className="flex justify-center mt-[100px]">
      {data ? (
        <div className='flex flex-col bg-blue-300 w-[200px] h-[200px] justify-center items-center'>
          <div>제목: {data.title}</div>
          <div>저자: {data.author}</div>
          <div>가격: {data.price}</div>
          <div>{data.count} 권</div>
        </div>
      ) : (
        <div>책 정보를 찾을 수 없습니다.</div>
      )}
    </div>
  );
}
