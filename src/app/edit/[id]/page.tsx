"use client"
import React, { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

type Props = {
  params: Promise<{ id: string }>;
}

type BookProps = {
  _id: string;
  id: string;
  title: string;
  content: string;
  author: string;
  price: number;
  count: number;
}

const fetchBookDetail = async (id: string) => {
  const res = await fetch(`/api/books/${id}`);
  if (!res.ok) {
    throw new Error('책 정보를 불러오는 데 실패했습니다.');
  }
  return res.json();
}

const updateBook = async ({ _id, title, author, price, count }: { _id: string, title: string, author: string, price: number, count: number }) => {
  const res = await fetch(`/api/books/${_id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, author, price, count }),
  });
  if (!res.ok) throw new Error('책 정보를 수정하는 데 실패했습니다.');
  return res.json();
};

export default function EditPage({params}: Props) {
  const { id } = React.use(params);

  const { data } = useQuery<BookProps, Error>({
    queryKey: ['bookDetail', id],
    queryFn: () => fetchBookDetail(id),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateBook,
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ['book', id]}); // 데이터 갱신
      console.log('수정 확인!', data);
      
    },
  });

  const [input_Id, setInput_Id] = useState<string>('');
  const [inputTitle, setInputTitle] = useState<string>('');
  const [inputContent, setInputContent] = useState<string>('');
  const [inputAuthor, setInputAuthor] = useState<string>('');
  const [inputPrice, setInputPrice] = useState<number>(0);
  const [inputCount, setInputCount] = useState<number>(0);

  useEffect(() => {
    if (data) {
      setInput_Id(data._id)
      setInputTitle(data.title);
      setInputContent(data.content);
      setInputAuthor(data.author);
      setInputPrice(data.price);
      setInputCount(data.count);
    }
  }, [data]);

  return (
    <>
      <div className='flex w-full h-full justify-center pt-[100px]'>
        <div className='flex flex-col w-[300px] h-[400px] bg-white gap-2'>
          <div>책 추가하기</div>
          <div>
            <span>제목</span>
            <input className='border-2' type="text" value={inputTitle} onChange={(e) => { setInputTitle(e.target.value) }} />
          </div>
          <div>
            <span>내용</span>
            <input className='border-2' type="text" value={inputContent} onChange={(e) => { setInputContent(e.target.value) }} />
          </div>
          <div>
            <span>저자</span>
            <input className='border-2' type="text" value={inputAuthor} onChange={(e) => { setInputAuthor(e.target.value) }} />
          </div>
          <div>
            <span>가격</span>
            <input className='border-2' type="text" value={inputPrice} onChange={(e) => { setInputPrice(parseInt(e.target.value)) }} />
          </div>
          <div>
            <span>권수</span>
            <input className='border-2' type="text" value={inputCount}  onChange={(e) => { setInputCount(parseInt(e.target.value)) }} />
          </div>
          <button className='border-2' onClick={() => mutation.mutate({ _id: input_Id, title: inputTitle, author: inputAuthor, price: inputPrice, count: inputCount })}>
            추가하기
          </button>
        </div>
      </div>
    </>
  )
}
