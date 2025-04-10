"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { RefreshCcw } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

function MaterialCardItem({ item, studyTypeContent, course, refreshData }) {
  const [loading, setLoading] = useState(false)
  console.log("this is the item ", studyTypeContent?.[item.type], "and the item is", item, studyTypeContent)
  const GenerateContent = async () => {
    setLoading(true);
    // console.log("this is the course data", course)
    let chapters = '';

    course?.courseLayout?.chapters.forEach((chapter) => {
      chapters = chapter?.chapter_title + ',' + chapters;
    })
    // console.log("this is the chapters", chapters)
    const result = await axios.post('/api/study-type-content', {
      courseId: course?.courseId,
      type: item.name,
      chapters: chapters
    })
    console.log("this is the flash result", result)
    setLoading(false);
    refreshData(true);
    toast("Your content is being generated")
  }

  return (
    <div className={`border shadow-md rounded-lg p-5 flex flex-col items-center
    ${studyTypeContent?.[item.type]?.length == null && 'grayscale'}
    `}>
      {studyTypeContent?.[item.type]?.length == null ? <h2 className='p-1 px-2 bg-gray-600 text-white rounded-full text-[10px] mb-2'>generating</h2> :
        <h2 className='p-1 px-2 bg-green-500 text-white rounded-full text-[10px] mb-2'>Ready</h2>}
      <Image src={item.icon} alt={item.name} width={50} height={50} />
      <h2 className='font-medium mt-3'>{item.name}</h2>
      <p className='text-slate-700 text-sm text-center'>{item.desc}</p>
      {studyTypeContent?.[item.type]?.length == null ? <Button className='mt-3 w-full' variant='outline' onClick={() => GenerateContent()}>
        {loading && <RefreshCcw className='animate-spin' />}
        Generate</Button>
        : <Link href={'/course/' + course?.courseId + item.path}><Button className='mt-3 w-full' variant='outline'>View</Button></Link>}
    </div>

  )
}

export default MaterialCardItem;