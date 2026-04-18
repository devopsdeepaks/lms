import React from 'react'
import CourseHeader from './_components/CourseHeader';

function CourseViewLayout({ children }) {
  return (
    <div>
      <CourseHeader />
      <div className='mx-10 md:mx-16 lg:px-60 mt-10'>{children}</div>
    </div>
  )
}

export default CourseViewLayout