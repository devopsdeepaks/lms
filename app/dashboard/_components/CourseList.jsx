// "use client"
// import { useUser } from '@clerk/nextjs'
// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import CourseCardItem from './CourseCardItem'

// function CourseList() {

//     const {user}=useUser();
//     const[courseList,setCourseList]=useState([]);
//     useEffect(()=>{
//         user&&GetCourseList();
//     },[user])

// const GetCourseList=async()=>{
//      const result=await axios.post('/api/course',
//         {createBy:user?.primaryEmailAddress?.emailAddress})
//         console.log(result.data.result.length);  // Logs the number of entries (courses)

//         setCourseList(result.data.result);
// }

//   return (
//     <div className='mt-10'>
//         <h2 className='font-bold text-2xl'>Your Study Material</h2>

//         <div>
//             {courseList?.map((course,index)=>( 
//                 <CourseCardItem course={course} key={index}/>
//             ))}
//         </div>
//     </div>
//   )
// }

// export default CourseList
"use client"
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CourseCardItem from './CourseCardItem'

function CourseList() {
    const { user } = useUser();
    const [courseList, setCourseList] = useState([]);

    useEffect(() => {
        if (user) {
            GetCourseList(); // Fetch courses when the user is available
        }
    }, [user]);

    const GetCourseList = async () => {
        try {
            // Make the API call to fetch courses for the logged-in user
            const result = await axios.post('/api/course', {
                createdBy: user?.primaryEmailAddress?.emailAddress
            });

            console.log('API Response:', result); // Log the response to verify data

            // Log the number of entries in the database (length of the result array)
            console.log(`Number of entries in database: ${result.data.result.length}`);

            // Set the fetched courses in the state
            setCourseList(result.data.result);
        } catch (error) {
            console.error('Error fetching courses:', error); // Handle any error that occurs during the fetch
        }
    };

    return (
        <div className="mt-10">
            <h2 className="font-bold text-2xl">Your Study Material</h2>

            {/* Display courses if there are any */}
            <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 mt-2 gap-5'>
                {courseList.length > 0 ? (
                    courseList.map((course, index) => (
                        <CourseCardItem course={course} key={index} /> // Display each course
                    ))
                ) : (
                    <p>No courses available.</p> // Display message if no courses are found
                )}
            </div>
        </div>
    );
}

export default CourseList;
