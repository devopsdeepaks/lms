import React from 'react';
import Image from 'next/image';

function CourseIntroCard({ course }) {
  // console.log(course); // Log the course data to check its structure
  return (
    <div className='flex gap-5 items-center p-10 border shadow-md rounded'>
      {/* <p>CourseIntroCard</p> */}
      <Image src={'/knowledge.png'} alt='other' width={50} height={70} />
      <div>
        <h2 className='font-bold text-2xl'>{course?.courseLayout?.course_title || 'Default Course Title'}</h2>
        <p>{course?.courseLayout?.course_description}</p>
        <div className='mt-3 w-full bg-gray-200 rounded-full h-2'>
          <div className='h-2 rounded-full bg-green-500 w-full' />
        </div>

        <h2 className='mt-3 text-lg text-primary'>Total Chapter: {course?.courseLayout?.chapters?.length ?? 0}</h2>
      </div>
    </div>
  );
}

export default CourseIntroCard;