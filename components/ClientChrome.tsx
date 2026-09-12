'use client'

import dynamic from 'next/dynamic'

const CustomCursor = dynamic(() => import('@/components/CustomCursor'), {
  ssr: false,
})
const Chatbot = dynamic(() => import('@/components/Chatbot'), {
  ssr: false,
})

/** Browser-only UI – dynamic + ssr:false nur in Client Components erlaubt */
export default function ClientChrome() {
  return (
    <>
      <CustomCursor />
      <Chatbot />
    </>
  )
}
