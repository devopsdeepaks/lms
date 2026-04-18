"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { RefreshCcw, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

function MaterialCardItem({ item, studyTypeContent, course, refreshData }) {
  const [loading, setLoading] = useState(false)

  const isReady = studyTypeContent?.[item.type]?.length != null

  const GenerateContent = async () => {
    setLoading(true)
    let chapters = ''
    course?.courseLayout?.chapters.forEach((chapter) => {
      chapters = chapter?.chapter_title + ',' + chapters
    })
    await axios.post('/api/study-type-content', {
      courseId: course?.courseId,
      type: item.type,
      chapters: chapters
    })
    setLoading(false)
    refreshData(true)
    toast('Your content is being generated')
  }

  return (
    <div className={`relative rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow duration-200 p-6 flex flex-col items-center gap-3 ${!isReady ? 'opacity-60' : ''}`}>

      {/* Status badge */}
      <span className={`absolute top-3 right-3 text-[10px] font-semibold px-2 py-0.5 rounded-full ${
        isReady ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
      }`}>
        {isReady ? 'Ready' : 'Not Generated'}
      </span>

      {/* Icon */}
      <div className='w-16 h-16 rounded-xl bg-gray-50 flex items-center justify-center'>
        <Image src={item.icon} alt={item.name} width={40} height={40} />
      </div>

      {/* Text */}
      <div className='text-center'>
        <h2 className='font-semibold text-gray-800'>{item.name}</h2>
        <p className='text-gray-500 text-xs mt-1'>{item.desc}</p>
      </div>

      {/* Action */}
      {isReady ? (
        <Link href={'/course/' + course?.courseId + item.path} className='w-full mt-1'>
          <Button className='w-full gap-2 bg-black text-white hover:bg-gray-800' size='sm'>
            View <ArrowRight className='w-3.5 h-3.5' />
          </Button>
        </Link>
      ) : (
        <Button
          className='w-full mt-1'
          variant='outline'
          size='sm'
          onClick={GenerateContent}
          disabled={loading}
        >
          {loading ? <RefreshCcw className='animate-spin w-4 h-4 mr-2' /> : null}
          {loading ? 'Generating...' : 'Generate'}
        </Button>
      )}
    </div>
  )
}

export default MaterialCardItem;
