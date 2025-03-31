"use client"

import DashboardHeader from '@/app/dashboard/_components/DashboardHeader';
import axios from 'axios';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import CourseIntroCard from './_components/CourseIntroCard';

function Course() {
    const {courseId}=useParams();
    const [course,setCourse]=useState();
    useEffect(()=>{
        GetCourse()
    },[])
    const GetCourse = async (courseId) => {
      try {
        const result = await axios.get(`/api/course/${courseId}`);

        console.log(result);
        setCourse(result.data.result)
        return result;
      } catch (error) {
        console.error('Error fetching course data:', error);
        return null;
       }
      
    };
  return (
    <div>
        <DashboardHeader/>
        <div className='mx-10 md:mx-36 lg:px-60 mt-10'>
        {/* course intro */}
           <CourseIntroCard course={course}/>
        {/* study materials options */}

        {/* chapter list  */}
         </div>
    </div>
  )
}

export default Course