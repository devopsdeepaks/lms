"use client"
import { UserButton } from '@clerk/nextjs'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

function CourseHeader() {
  const router = useRouter()

  return (
    <div className='p-4 shadow-sm border-b flex items-center justify-between bg-white sticky top-0 z-10'>
      <button
        onClick={() => router.back()}
        className='flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors'
      >
        <ArrowLeft className='w-4 h-4' />
        Back
      </button>
      <UserButton />
    </div>
  )
}

export default CourseHeader
