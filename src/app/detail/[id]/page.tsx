import React from 'react'

type Props = {
  params: {
    id: string
  }
}

export default function DetailPage({params}: Props) {
  return (
    <>
      {params ? <div>{params.id} DetailPage</div> : <div>Loading...</div>}
    </>
  )
}
