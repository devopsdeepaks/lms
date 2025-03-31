import React from 'react';
import Image from 'next/image';

function CourseIntroCard({ course }) {
  // console.log(course); // Log the course data to check its structure
  return (
    <div>
      {/* <p>CourseIntroCard</p> */}
      <Image src={'/knowledge.png'} alt='other' width={50} height={70} />
      <div>
        <h2 className='font-bold text-2xl'>{course?.courseLayout?.study_material?.subject || 'Default Course Title'}</h2>

      </div>
    </div>
  );
}

export default CourseIntroCard;