"use client"

import DashboardHeader from '@/app/dashboard/_components/DashboardHeader';
import axios from 'axios';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import CourseIntroCard from './_components/CourseIntroCard';
import StudyMaterialSection from './_components/StudyMaterialSection';
import ChapterList from './_components/ChapterList';

function Course() {
  const { courseId } = useParams();
  const [course, setCourse] = useState();
  useEffect(() => {
    GetCourse()
  }, [])
  const GetCourse = async () => {
    try {
      console.log("this is course id", courseId);
      const result = await axios.get(`/api/courses?courseId=${courseId}`);

      console.log("this is course result", result.data.result);
      setCourse(result.data.result)
      return result;
    } catch (error) {
      console.error('Error fetching course data:', error);
      return null;
    }

  };
  return (
    <div>
     
      <div className=''>
        {/* course intro */}
        <CourseIntroCard course={course} />
        {/* study materials options */}
        <StudyMaterialSection courseId={courseId} course={course}/>
        {/* chapter list  */}
        <ChapterList course={course}/>
      </div>
    </div>
  )
}

export default Course