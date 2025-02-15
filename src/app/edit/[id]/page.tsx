import React from 'react'

type Props = {
  params: {
    id: string
  }
}

export default function EditPage({params}: Props) {
  return (
    <>
    {params ? <div>{params.id} EditPage</div> : <div>Loading...</div>}
  </>
  )
}
