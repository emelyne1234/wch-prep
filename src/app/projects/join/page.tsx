import Join from '@/components/dashboard/Join'
import React from 'react'

function page() {
  return (
    <div className='max-w-[90%] mx-auto mt-24'>
      <h1 className='blue-gradient_text font-semibold drop-shadow-lg text-2xl lg:text-4xl mb-6'>Join Project</h1>
      <Join />
    </div>
  )
}

export default page