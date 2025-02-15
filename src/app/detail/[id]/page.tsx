"use client"
import { usePathname, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

type Props = {
  params: {
    id: string
  }
}

type BookProps = {
  id: string,
  title: string,
  author: string,
  price: string,
  count: number
}

export default function DetailPage({params}: Props) {
  const [currentBookDetail, setCurrentBookDetail] = useState<BookProps | null>();

  const { id } = React.use(params);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/MOCK_DATA.json');
      const data = await response.json();
      const test = data.filter((item: any) => (
        item.id.toString() === id
      ))
      setCurrentBookDetail(test[0]);
    };
    fetchData();
  }, [id]);

  return (
    <div className="flex justify-center mt-[100px]">
      {currentBookDetail ? (
        <div className='flex flex-col bg-blue-300 w-[200px] h-[200px] justify-center items-center'>
          <div>제목: {currentBookDetail.title}</div>
          <div>저자: {currentBookDetail.author}</div>
          <div>가격: {currentBookDetail.price}</div>
          <div>{currentBookDetail.count} 권</div>
        </div>
      ) : (<div>Loading...</div>)}
    </div>
  )
}
