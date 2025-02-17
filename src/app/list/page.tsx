"use client"
import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import { useQuery, useQueryClient, useMutation} from '@tanstack/react-query';

const ITEMS_PER_PAGE = 10;

type Props = {
  _id: string,
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

const deleteBook = async (id: string) => {
  const res = await fetch(`/api/books/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error('책을 삭제하는 데 실패했습니다.');
  }

  return res.json();
};

export default function ListPage() {
  const router = useRouter();
  const { data } = useQuery({
    queryKey: ['books'],
    queryFn: fetchBooks,
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteBook, 
    onSuccess: (data) => {
      console.log('삭제 성공', data);
      
      queryClient.invalidateQueries({
        queryKey: ['books'],
      });
    },
    onError: (error) => {
      console.error('삭제 실패:', error);
    },
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

  const onClickDetail = (id: string) => {
    router.push(`/detail/${id}`);
  };

  const onClickDelete = (id: string) => {
    mutation.mutate(id);
  };

  return (
    <div className='flex flex-col p-10 w-[1000px] h-[700px] gap-4 border-1'>
      <h1 className='flex justify-center text-5xl mb-10'>책 목록</h1>
      <div className="flex justify-between">
        <div className='text-2xl p-2'>
          <span>제목: </span>
          <input
            className='ml-2 border-1 w-[400px]'
            type="text"
            value={bookSearch}
            onChange={(e) => setBookSearch(e.target.value)}
            placeholder='책 제목을 입력해주세요.'
          />
        </div>
        <div>
          <button className='border-1 text-2xl p-2' onClick={() => {
            router.push(`/add`);
          }}>책 추가</button>
        </div>
      </div>
      <table className='border-1'>
        <thead>
          <tr>
            <th className='border-1'>제목</th>
            <th className='border-1 w-[150px]'>저자</th>
            <th className='border-1 w-[120px]'>가격</th>
            <th className='border-1 w-[100px]'>권 수</th>
            <th className='border-1 w-[40px]'>수정</th>
            <th className='border-1 w-[40px]'>삭제</th>
          </tr>
        </thead>
        <tbody>
            {paginatedItems.map((item: Props) => (
              <tr className='h-[40px]' key={item._id}>
                <td className='border-1 pl-3' onClick={() => onClickDetail(item._id)}>{item.title}</td>
                <td className='border-1 text-center'>{item.author}</td>
                <td className='border-1 text-center'>{item.price.toLocaleString()}원</td>
                <td className='border-1 text-center'>{item.count}</td>
                <td className='border-1 text-center'>
                  <button onClick={() => { router.push(`/edit/${item._id}`) }}>o</button>
                </td>
                <td className='border-1 text-center'>
                  <button onClick={() => { onClickDelete(item._id) }}>x</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="flex justify-center gap-4">
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
