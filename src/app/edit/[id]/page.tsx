import React from 'react'

type Props = {
  params: Promise<{ id: string }>;
}

export default function EditPage({params}: Props) {
  const { id } = React.use(params);
  return (
    <>
    {id ? <div>{id} EditPage</div> : <div>Loading...</div>}
  </>
  )
}
