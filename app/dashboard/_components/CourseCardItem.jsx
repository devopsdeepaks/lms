import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

function CourseCardItem({ course }) {
  // Log the course object to inspect the structure

  // Access the description with fallback logic to cover different structures
  const description = course?.study_material?.description  // Case 1: study_material.description
    || course?.study_material?.details?.description  // Case 2: study_material.details.description
    || course?.courseLayout?.study_material?.description  // Case 3: courseLayout.study_material.description
    || course?.courseLayout?.study_material_title?.description  // Case 4: courseLayout.study_material_title.description
    || course?.topic  // If no description, fallback to topic
    || 'No description available.';  // Fallback message if nothing exists

  return (
    <div className='border rounded-lg shadow-md p-4'>
      <div>
        <div className='flex justify-between items-center'>
          <Image src='/knowledge.png' alt='other' width={50} height={50} />
          <h2 className='text-[10px] p-1 px-2 rounded-full bg-slate-800 text-white'>18 March 2025</h2>
        </div>
        <h2 className='mt-3 font-medium text-lg'>{course?.topic}</h2>
        <p className='text-sm line-clamp-2 text-gray-500 mt-2'>{description}</p>

        <div className='mt-3 bg-slate-500'> 
            <progress value={0}/>
        </div>
        <div className='mt-3 flex justify-end'>
            <Button className='bg-slate-800'>View</Button>
        </div>
      </div>
    </div>
  );
}

export default CourseCardItem;

