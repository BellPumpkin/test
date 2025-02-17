"use client"
import React from 'react'
import { useQuery } from '@tanstack/react-query';

type Props = {
  params: Promise<{ id: string }>;
}

type BookProps = {
  id: string;
  title: string;
  content: string;
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

  const { data } = useQuery<BookProps, Error>({
    queryKey: ['bookDetail', id],
    queryFn: () => fetchBookDetail(id),
  });

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };

  const formatPrice = (price: string) => {
    return price.toLocaleString()
  };

  return (
    <div className="flex justify-center border-1">
      {data ? (
        <div className='flex w-[1000px] h-[700px] gap-2 p-10 justify-center'>
          <div className='flex flex-2 justify-center items-center'>
            img
          </div>
          <div className='flex flex-col flex-3 gap-3 items justify-center'>
            <div className='text-4xl'>제목: {data.title}</div>
            <div className='text-2xl'>저자: {data.author}</div>
            <div className='text-2xl'>가격: {formatPrice(data.price)}원</div>
            <div className='text-2xl'>남은 책 수량: {data.count} 권</div>
            <div className='flex flex-col text-2xl'>
              <div>책 내용</div>
              <div>{truncateText(data.content, 200)}</div>
            </div>
            <div className='flex justify-end'>
              <button className='border-1 text-2xl p-2'>구매하기</button>
            </div>
          </div>
        </div>
      ) : (
        <div>책 정보를 찾을 수 없습니다.</div>
      )}
    </div>
  );
}
