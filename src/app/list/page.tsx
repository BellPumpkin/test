"use client"
import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query';

const ITEMS_PER_PAGE = 10;

type Props = {
  id: number,
  title: string,
  author: string,
  price: number,
  count: number
}

const fetchBooks = async () => {
  const res = await fetch('/api/books');
  const data = await res.json();
  return data;
};

export default function ListPage() {
  const router = useRouter();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['books'],
    queryFn: fetchBooks,
  });

  const [bookSearch, setBookSearch] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredBooks, setFilteredBooks] = useState<Props[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (data) {
      const filtered = data.filter((item: Props) =>
        item.title.toLowerCase().includes(bookSearch.toLowerCase())
      );

      setFilteredBooks(filtered);
      setTotalPages(Math.ceil(filtered.length / ITEMS_PER_PAGE));
    }
  }, [data, bookSearch]);

  const paginatedItems = filteredBooks.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const onClickDetail = (id: number) => {
    router.push(`/detail/${id}`);
  };

  const onClickedBookSearch = () => {
  };

  return (
    <div className='flex flex-col items-center w-full h-full pt-[100px] gap-4'>
      <h1 className='flex text-4xl'>책 목록</h1>
      <div>
        <span>제목</span>
        <input
          className='border-2'
          type="text"
          value={bookSearch}
          onChange={(e) => setBookSearch(e.target.value)}
          placeholder='책 제목을 입력해주세요.'
        />
        <button onClick={onClickedBookSearch}>검색</button>
      </div>
      <table className='border-2'>
        <thead>
          <tr>
            <th className='border-2 w-[100px]'>아이디</th>
            <th className='border-2'>제목</th>
            <th className='border-2 w-[100px]'>저자</th>
            <th className='border-2 w-[100px]'>가격</th>
            <th className='border-2 w-[50px]'>권 수</th>
          </tr>
        </thead>
        <tbody>
            {paginatedItems.map((item: Props) => (
              <tr key={item.id} className='cursor-pointer' onClick={() => onClickDetail(item.id)}>
                <td className='border-2 text-center'>{item.id}</td>
                <td className='border-2 pl-3'>{item.title}</td>
                <td className='border-2 text-center'>{item.author}</td>
                <td className='border-2 text-center'>{item.price}</td>
                <td className='border-2 text-center'>{item.count}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="flex gap-4">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          이전
        </button>
        <span>{currentPage} / {totalPages}</span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          다음
        </button>
      </div>
    </div>
  );
}
