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
        <progress className="mt-3 w-full" />

        <h2 className='mt-3 text-lg text-primary'>Total Chapter: {course?.courseLayout?.chapters.length}</h2>
      </div>
    </div>
  );
}

export default CourseIntroCard;