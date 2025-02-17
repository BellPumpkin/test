'use client'
import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation';

// 새로운 책을 추가하는 함수
const addBook = async (newBook: { title: string, content: string, author: string, price: number, count: number }) => {
  const response = await fetch('/api/books', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newBook),
  });

  if (!response.ok) {
    throw new Error('책 추가에 실패했습니다.');
  }

  return response.json();
};

export default function AddPage() {
  const [inputTitle, setInputTitle] = useState<string>('');
  const [inputContent, setInputContent] = useState<string>('');
  const [inputAuthor, setInputAuthor] = useState<string>('');
  const [inputPrice, setInputPrice] = useState<number>();
  const [inputCount, setInputCount] = useState<number>();

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: addBook,
    onSuccess: (data) => {
      console.log('책 추가 성공:', data);
      router.push('/list')
    },
    onError: (error: Error) => {
      console.error('책 추가 실패:', error.message);
    }
  });

  const onClickAddBook = () => {
    
    const newBook = {
      title: inputTitle,
      content: inputContent,
      author: inputAuthor,
      price: inputPrice || 0,
      count: inputCount || 0,
    };

    mutation.mutate(newBook);
  }

  return (
      <div className='flex flex-col w-[1000px] h-[700px] bg-white gap-2 p-10 border-1'>
        <div className='text-4xl text-center m-15'>책 추가하기</div>
        <div className='flex flex-col gap-5'>
          <div className='text-2xl'>
            <span>제목: </span>
            <input className='w-[400px] border-1 ' type="text" onChange={(e) => { setInputTitle(e.target.value) }} />
          </div>
          <div className='text-2xl'>
            <span>저자: </span>
            <input className='w-[400px] border-1' type="text" onChange={(e) => { setInputAuthor(e.target.value) }} />
          </div>
          <div className='text-2xl'>
            <span>가격: </span>
            <input className='w-[400px] border-1' type="text" onChange={(e) => { setInputPrice(parseInt(e.target.value)) }} />
          </div>
          <div className='text-2xl'>
            <span>권수: </span>
            <input className='w-[400px] border-1' type="text" onChange={(e) => { setInputCount(parseInt(e.target.value)) }} />
          </div>

          <div className='text-2xl'>
            <div>내용: </div>
            <textarea className='w-full h-[150px] border-1' onChange={(e) => { setInputContent(e.target.value) }} />
          </div>
          <div className='text-2xl'>
            <button className='flex border-1' onClick={onClickAddBook}>추가하기</button>
          </div>
        </div>
      </div>
  );
}
