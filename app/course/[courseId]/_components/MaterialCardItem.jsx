import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import axios from 'axios'
function MaterialCardItem({item,studyTypeContent,course}) {

  const GenerateContent = async () => {
    try {
      const response = await axios.post('/api/generate-study-type-content', {
        courseId: course.courseId, // Assuming courseId is in the `course` object
        type: item.type
      });

      // Optionally, log the response or update the UI
      console.log("Content generated:", response.data);
      
      // Optionally update the studyTypeContent state or handle the response
    } catch (error) {
      console.error("Error generating content:", error);
    }
  }

  return (
    <div className={`border shadow-md rounded-lg p-5 flex flex-col items-center
    ${studyTypeContent?.[item.type]?.length==null&&'grayscale'}
    `}>
        {studyTypeContent?.[item.type]?.length==null?<h2 className='p-1 px-2 bg-gray-600 text-white rounded-full text-[10px] mb-2'>generating</h2>:
        <h2 className='p-1 px-2 bg-green-500 text-white rounded-full text-[10px] mb-2'>Ready</h2>}
        <Image src={item.icon} alt={item.name} width={50} height={50}/>
        <h2 className='font-medium mt-3'>{item.name}</h2>
        <p className='text-slate-700 text-sm text-center'>{item.desc}</p>
        {studyTypeContent?.[item.type]?.length==null?
         <Button className='mt-3 w-full' variant='outline'  onClick={()=>GenerateContent()}>Generate</Button>
        : <Button className='mt-3 w-full' variant='outline'>View</Button>}
    </div>
  )
}

export default MaterialCardItem;