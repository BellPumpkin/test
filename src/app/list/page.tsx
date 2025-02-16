"use client"
import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'

const ITEMS_PER_PAGE = 10;

export default function ListPage() {
  const router = useRouter();
  
  const [mockup, setMockup] = useState<any[]>([]);
  const [bookSearch, setBookSearch] = useState<string>('');
  const [authorSearch, setAuthorSearch] = useState<string>('');

  useEffect(() => {
    const fetchBooks = async () => {
      const res = await fetch("/api/books");
      const data = await res.json();

      setMockup(data);
    };

    fetchBooks();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedItems = mockup.slice(startIndex, endIndex);

  const totalPages = Math.ceil(mockup.length / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const onClickDetail = (id: number) => {
    router.push(`/detail/${id}`)
  }
  
  const onClickedBookSearch = (searchWord: string) => {
    setMockup((prev) => (
      prev.filter((items) => items.title.toLowerCase().includes(searchWord.toLowerCase()))
    ))
    const test = mockup.filter((items) => items.title.toLowerCase().includes(searchWord.toLowerCase()))
  }

  return (
    <div className='flex flex-col items-center w-full h-full pt-[100px] gap-4'>
      <h1 className='flex text-4xl'>책 목록</h1>
      <div className=''>
        <span>제목</span>
        <input className='border-2' type="text" onChange={(e) => { setBookSearch(e.target.value) }} placeholder='책 제목을 입력해주세요.'/>
        <button onClick={() => {
          onClickedBookSearch(bookSearch)
        }}>검색</button>
      </div>
      <div className=''>
        <span>저자</span>
        <input className='border-2' type="text" placeholder='저자 이름을 입력해주세요.'/>
        <button>검색</button>
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
          {paginatedItems.map((item) => (
            <tr key={item.id} className='cursor-pointer' onClick={() => {
              onClickDetail(item.id);
            }}>
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