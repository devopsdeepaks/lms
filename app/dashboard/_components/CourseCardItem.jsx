"use client";
import { Button } from '@/components/ui/button';
import { RefreshCw, ArrowRight, BookOpen } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const COLORS = [
  'from-blue-50 to-indigo-50 border-blue-100',
  'from-violet-50 to-purple-50 border-violet-100',
  'from-emerald-50 to-teal-50 border-emerald-100',
  'from-amber-50 to-orange-50 border-amber-100',
  'from-rose-50 to-pink-50 border-rose-100',
  'from-cyan-50 to-sky-50 border-cyan-100',
];

const CourseCardItem = ({ course, index = 0 }) => {
  const [status, setStatus] = useState(course?.status);

  useEffect(() => {
    setStatus(course?.status);
  }, [course?.status]);

  const colorClass = COLORS[index % COLORS.length];
  const isGenerating = status === 'Generating';

  return (
    <div className={`rounded-2xl border bg-gradient-to-br ${colorClass} p-5 flex flex-col gap-4 hover:shadow-lg transition-shadow duration-200`}>

      {/* Top row */}
      <div className='flex items-start justify-between'>
        <div className='w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center'>
          <Image src={'/knowledge.png'} alt='course' width={32} height={32} />
        </div>
        <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${
          isGenerating
            ? 'bg-amber-100 text-amber-700'
            : 'bg-green-100 text-green-700'
        }`}>
          {isGenerating ? 'Generating' : 'Ready'}
        </span>
      </div>

      {/* Title & description */}
      <div className='flex-1'>
        <h2 className='font-semibold text-gray-800 text-base leading-snug line-clamp-2'>
          {course?.courseLayout?.course_title || course?.topic}
        </h2>
        <p className='text-xs text-gray-500 mt-1.5 line-clamp-2'>
          {course?.courseLayout?.course_description}
        </p>
      </div>

      {/* Progress bar */}
      <div>
        <div className='w-full bg-white/60 rounded-full h-1.5'>
          <div className={`h-1.5 rounded-full transition-all ${
            isGenerating ? 'w-1/3 bg-amber-400 animate-pulse' : 'w-full bg-green-500'
          }`} />
        </div>
      </div>

      {/* Action */}
      {isGenerating ? (
        <div className='flex items-center gap-2 text-sm text-amber-700 font-medium'>
          <RefreshCw className='w-4 h-4 animate-spin' />
          Generating content...
        </div>
      ) : (
        <Link href={`/course/${course?.courseId}`}>
          <Button className='w-full bg-white text-gray-800 border border-gray-200 hover:bg-gray-50 gap-2 shadow-sm' variant='outline'>
            View Course <ArrowRight className='w-3.5 h-3.5' />
          </Button>
        </Link>
      )}
    </div>
  );
};

export default CourseCardItem;
