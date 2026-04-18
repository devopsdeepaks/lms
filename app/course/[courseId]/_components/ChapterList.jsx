"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ChevronDown, ChevronUp, BookOpen } from 'lucide-react'

function ChapterList({ course }) {
  const CHAPTERS = course?.courseLayout?.chapters
  const [notes, setNotes] = useState([])
  const [openIndex, setOpenIndex] = useState(null)

  useEffect(() => {
    if (course?.courseId) fetchNotes()
  }, [course?.courseId])

  const fetchNotes = async () => {
    try {
      const result = await axios.post('/api/study-type', {
        courseId: course.courseId,
        studyType: 'notes'
      })
      if (Array.isArray(result?.data?.notes)) {
        setNotes(result.data.notes)
      }
    } catch (e) {
      console.error('Failed to fetch chapter notes:', e)
    }
  }

  const getNoteForChapter = (index) => {
    // chapterId is stored as the index (0-based) in CHAPTER_NOTES_TABLE
    return notes.find(n => n.chapterId === index)
  }

  const toggle = (index) => {
    setOpenIndex(prev => prev === index ? null : index)
  }

  if (!CHAPTERS?.length) return null

  return (
    <div className='mt-8 mb-10'>
      <h2 className='font-semibold text-xl mb-4'>Chapters</h2>
      <div className='flex flex-col gap-3'>
        {CHAPTERS.map((chapter, index) => {
          const isOpen = openIndex === index
          const note = getNoteForChapter(index)
          const hasContent = !!note?.notes

          return (
            <div
              key={index}
              className={`border rounded-xl overflow-hidden transition-shadow duration-200 ${isOpen ? 'shadow-md' : 'shadow-sm hover:shadow-md'}`}
            >
              {/* Chapter header row */}
              <button
                className='w-full flex items-center justify-between gap-4 p-4 text-left bg-white hover:bg-gray-50 transition-colors'
                onClick={() => toggle(index)}
              >
                <div className='flex items-center gap-3'>
                  <div className='w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0'>
                    <span className='text-blue-600 font-semibold text-sm'>{index + 1}</span>
                  </div>
                  <div>
                    <h3 className='font-semibold text-gray-800'>{chapter?.chapter_title}</h3>
                    <p className='text-slate-500 text-xs mt-0.5 line-clamp-1'>{chapter?.chapter_summary}</p>
                  </div>
                </div>
                <div className='flex items-center gap-2 shrink-0'>
                  {!hasContent && notes.length > 0 && (
                    <span className='text-xs text-gray-400'>No content</span>
                  )}
                  {isOpen
                    ? <ChevronUp className='w-4 h-4 text-gray-400' />
                    : <ChevronDown className='w-4 h-4 text-gray-400' />
                  }
                </div>
              </button>

              {/* Expanded notes content */}
              {isOpen && (
                <div className='border-t px-6 py-5 bg-gray-50'>
                  {notes.length === 0 ? (
                    <p className='text-gray-400 text-sm'>Notes not generated yet. Generate them from the study materials section.</p>
                  ) : hasContent ? (
                    <div
                      className='prose prose-sm max-w-none text-gray-700'
                      dangerouslySetInnerHTML={{
                        __html: note.notes
                          ?.replace(/```html\s*/gi, '')
                          .replace(/```\s*/g, '')
                          .trim()
                      }}
                    />
                  ) : (
                    <p className='text-gray-400 text-sm'>No notes available for this chapter.</p>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ChapterList
