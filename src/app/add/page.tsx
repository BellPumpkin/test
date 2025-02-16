'use client'
import React, { useEffect, useState } from 'react'

export default function AddPage() {

    const [inputTitle, setInputTitle] = useState<string>('');
    const [inputContent, setInputContent] = useState<string>('');
    const [inputAuthor, setInputAuthor] = useState<string>('');
    const [inputPrice, setInputPrice] = useState<number>();
    const [inputCount, setInputCount] = useState<number>();

    const onClickAddBook = () => {
        console.log(inputTitle);
        console.log(inputContent);
        console.log(inputAuthor);
        console.log(inputPrice);
        console.log(inputCount);
    }

  return (
    <div className='flex w-full h-full justify-center pt-[100px]'>
        <div className='flex flex-col w-[300px] h-[400px] bg-white gap-2'>
            <div>책 추가하기</div>
            <div>
                <span>제목</span>
                <input className='border-2' type="text" onChange={(e) => { setInputTitle(e.target.value) }} />
            </div>
            <div>
                <span>내용</span>
                <input className='border-2' type="text" onChange={(e) => { setInputContent(e.target.value) }} />
            </div>
            <div>
                <span>저자</span>
                <input className='border-2' type="text" onChange={(e) => { setInputAuthor(e.target.value) }} />
            </div>
            <div>
                <span>가격</span>
                <input className='border-2' type="text" onChange={(e) => { setInputPrice(parseInt(e.target.value)) }} />
            </div>
            <div>
                <span>권수</span>
                <input className='border-2' type="text" onChange={(e) => { setInputCount(parseInt(e.target.value)) }} />
            </div>
            <button className='border-2' onClick={onClickAddBook}>추가하기</button>
        </div>
    </div>
  )
}
