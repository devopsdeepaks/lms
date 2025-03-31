// "use client";
// import { Button } from '@/components/ui/button';
// import { RefreshCw } from 'lucide-react';
// import Image from 'next/image';
// import React from 'react'


// const CourseCardItem = ({ course }) => {
//     return (
//         <div className='border rounded-lg shadow-md p-4'>
//             <div>
//                 <div className='flex justify-between items-center'>
//                     <Image src={'/knowledge.png'} alt='Other' width={50} height={50} />
//                     <h2 className='text-[10px] text-white p-1 px-2 rounded-full bg-blue-600'>20 Dec 2024</h2>
//                 </div>
//                 <h2 className='mt-3 font-medium text-lg'>{course?.courseLayout?.course_title}</h2>
//                 <p className='text-sm line-clamp-2 text-gray-500 mt-2'>{course?.courseLayout?.course_description}</p>

//                 <div className='mt-3'>
//                     <progress value={10} />
//                 </div>
//                 <div className='mt-3 justify-end flex gap-2'>
//                     {course?.status == 'Generating' ?
//                         <h2 className='text-sm flex gap-2 items-center p-1 px-2 rounded-full bg-gray-200'>
//                             <RefreshCw className='h-5 w-5 animate-spin' /> Generating...</h2>

//                         :
//                         <link href={'/course/'+course?.courseId}>
//                             <Button>view</Button>
//                         </link> }
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default CourseCardItem

"use client";
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const CourseCardItem = ({ course }) => {
  const [status, setStatus] = useState(course?.status);
  console.log("course value", course);
  // Optional: simulate status change (just for demonstration)
  useEffect(() => {
    if (course?.status === 'Generating') {
      const timer = setTimeout(() => {
        // Simulate status update after some time
        setStatus('Completed'); // This would be replaced with real status change logic
      }, 5000); // Change status after 5 seconds (for demonstration purposes)

      return () => clearTimeout(timer); // Clean up the timer on component unmount
    }
  }, [course?.status]);

  return (
    <div className='border rounded-lg shadow-md p-4'>
      <div>
        <div className='flex justify-between items-center'>
          <Image src={'/knowledge.png'} alt='Other' width={50} height={50} />
          <h2 className='text-[10px] text-white p-1 px-2 rounded-full bg-blue-600'>20 Dec 2024</h2>
        </div>
        <h2 className='mt-3 font-medium text-lg'>{course?.topic}</h2>
        <p className='text-sm line-clamp-2 text-gray-500 mt-2'>{course?.courseLayout?.course_description}</p>

        <div className='mt-3'>
          <progress value={10} />
        </div>
        <div className='mt-3 justify-end flex gap-2'>
          {status === 'Generating' ? (
            <h2 className='text-sm flex gap-2 items-center p-1 px-2 rounded-full bg-gray-200'>
              <RefreshCw className='h-5 w-5 animate-spin' /> Generating...
            </h2>
          ) : (
            <a href={`/course/${course?.courseId}`}>
              <Button className="bg-slate-700">View</Button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCardItem

