import React from 'react';
import Image from 'next/image';

function CourseIntroCard({ course }) {
  console.log(course); // Log the course data to check its structure
  return (
    <div>
      <p>CourseIntroCard</p>
      <Image src={'/knowledge.png'} alt='other' width={50} height={70} />
      <div>
        <h2>{course?.courseLayout?.course_title || 'Default Course Title'}</h2>
        
      </div>
    </div>
  );
}

export default CourseIntroCard;