import React, { useEffect, useState } from 'react';
import MaterialCardItem from '../_components/MaterialCardItem'; // going one level up
import axios from 'axios';
import Link from 'next/link';

function StudyMaterialSection({ courseId, course }) {

    const [studyTypeContent, setStudyTypeContent] = useState();
    const MaterialList = [
        {
            name: 'Notes/Chapters',
            desc: 'Read notes to prepare it',
            icon: '/notes.png',
            path: '/notes',
            type: 'notes'
        },
        {
            name: 'flashCard',
            desc: 'Flashcard help remember concepts ',
            icon: '/flashcard.png',
            path: '/flashcards',
            type: 'flashCard'
        },
        {
            name: 'quiz',
            desc: 'Great way to test your knowledge',
            icon: '/quiz.png',
            path: '/quiz',
            type: 'quiz'
        },
    ];

    useEffect(() => {
        GetStudyMaterial()
    }, []);

    // Updated GetStudyMaterial function with error handling
    const GetStudyMaterial = async () => {
        try {
            const result = await axios.post(`/api/study-type`, {
                courseId: courseId,
                studyType: 'ALL'
            });

            console.log(result?.data);
            setStudyTypeContent(result.data);
        } catch (error) {
            console.error("Error fetching study materials:", error);
            // Optionally show a user-friendly error message to the user
        }
    };

    return (
        <div className='mt-5'>
            <h2 className='font-medium text-xl'>Study Materials</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-3'>
                {MaterialList.map((item, index) => (
                    // <Link key={index} href={'/course/' + courseId + item.path}>
                    <MaterialCardItem key={item.icon} item={item}
                        studyTypeContent={studyTypeContent}
                        course={course}
                        refreshData={GetStudyMaterial}
                    />
                    // </Link>
                ))}
            </div>
        </div>
    );
}

export default StudyMaterialSection;
