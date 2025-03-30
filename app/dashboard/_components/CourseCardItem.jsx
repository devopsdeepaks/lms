"use client";
import { Button } from '@/components/ui/button';
import { RefreshCcw } from 'lucide-react';
import Image from 'next/image';
import React from 'react'


const CourseCardItem = ({ course }) => {
    return (
        <div className='border rounded-lg shadow-md p-4'>
            <div>
                <div className='flex justify-between items-center'>
                    <Image src={'/knowledge.png'} alt='Other' width={50} height={50} />
                    <h2 className='text-[10px] text-white p-1 px-2 rounded-full bg-blue-600'>20 Dec 2024</h2>
                </div>
                <h2 className='mt-3 font-medium text-lg'>{course?.courseLayout?.course_title}</h2>
                <p className='text-sm line-clamp-2 text-gray-500 mt-2'>{course?.courseLayout?.course_description}</p>

                <div className='mt-3'>
                    <progress value={10} />
                </div>
                <div className='mt-3 justify-end flex gap-2'>
                    {course?.status == 'Generating' ?
                        <h2 className='text-[12px] flex gap-2 items-center p-1 px-2 rounded-full bg-gray-200'><RefreshCcw /> Generating..</h2>
                        : <Button>view</Button>}
                </div>
            </div>
        </div>
    )
}

export default CourseCardItem

