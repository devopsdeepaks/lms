import React from 'react'
import DashboardHeader from '@/app/dashboard/_components/DashboardHeader';

function CourseViewLayout({children}) {
  return (
    <div className='mx-10 md:mx-36 lg:px-60 mt-10'>
         <DashboardHeader />
        <div>{children}</div>
    </div>
  )
}

export default CourseViewLayout