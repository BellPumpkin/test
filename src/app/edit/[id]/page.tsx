"use client"
import React, { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation';

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

const updateBook = async ({ _id, title, content, author, price, count }: { _id: string, title: string, content: string, author: string, price: number, count: number }) => {
  const res = await fetch(`/api/books/${_id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content, author, price, count }),
  });
  if (!res.ok) throw new Error('책 정보를 수정하는 데 실패했습니다.');
  return res.json();
};

export default function EditPage({params}: Props) {
  const { id } = React.use(params);
  const router = useRouter();

  const { data } = useQuery<BookProps, Error>({
    queryKey: ['bookDetail', id],
    queryFn: () => fetchBookDetail(id),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateBook,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['book', id]});
      router.push(`/detail/${id}`)
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
      <div className='flex flex-col w-[1000px] h-[700px] gap-2 p-10 border-1'>
      <div onClick={() => { router.push('/list') }}>{`목록으로`}</div>
        <div className='text-4xl text-center m-10'>책 수정하기</div>
        <div className='flex flex-col gap-5'>
          <div className='text-2xl'>
            <span>제목</span>
            <input className='w-[400px] border-1' type="text" value={inputTitle} onChange={(e) => { setInputTitle(e.target.value) }} />
          </div>
          <div className='text-2xl'>
            <span>저자</span>
            <input className='w-[400px] border-1' type="text" value={inputAuthor} onChange={(e) => { setInputAuthor(e.target.value) }} />
          </div>
          <div className='text-2xl'>
            <span>가격</span>
            <input className='w-[400px] border-1' type="text" value={inputPrice} onChange={(e) => { setInputPrice(parseInt(e.target.value)) }} />
          </div>
          <div className='text-2xl'>
            <span>권수</span>
            <input className='w-[400px] border-1' type="text" value={inputCount}  onChange={(e) => { setInputCount(parseInt(e.target.value)) }} />
          </div>
          <div className='text-2xl'>
            <div>내용: </div>
            <textarea className='w-full h-[150px] border-1' value={inputContent}  onChange={(e) => { setInputContent(e.target.value) }} />
          </div>
          <div className='text-2xl'>
            <button className='flex border-1' onClick={() => mutation.mutate({ _id: input_Id, title: inputTitle, content: inputContent, author: inputAuthor, price: inputPrice, count: inputCount })}>
              추가하기
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
