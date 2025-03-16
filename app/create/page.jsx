"use client";
import React, { useState } from 'react'
import SelectOption from './_component/SelectOption'
import { Button } from '@/components/ui/button';
import TopicInput from './_component/TopicInput';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs';


const Create = () => {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState([]);
    const { user } = useUser();
    const handleUserInput = (fieldName, fieldValue) => {
        setFormData(prev => ({
            ...prev,
            [fieldName]: fieldValue
        }))

        console.log(formData);
    }

    // used to save user input and generate  course layout using ai


    const GenerateCourseOutline = async () => {
        const courseId = uuidv4();
        const result = await axios.post('/api/generate-course-outline', {
            courseId: courseId,
            ...formData,
            createdBy: user?.primaryEmailAddress?.emailAddress
        });

        // console.log(result);
    }

    return (
        <div className='flex flex-col items-center p-8 mt-20'>
            <h2 className='font-bold text-3xl text-blue-600'>Start Building Your Personal Study Material</h2>
            <p className='text-gray-500 text-lg'>Fill all Details in order to generate study material for your next project</p>
            <div className='mt-10'>
                {step == 0 ? <SelectOption selectedStudyType={(value) => handleUserInput("courseType", value)} /> : <TopicInput setTopic={(value) => handleUserInput("topic", value)} setDifficultyLevel={(value) => handleUserInput("difficultyLevel", value)} />}

            </div>
            <div className='flex justify-between w-full mt-32'>
                {step != 0 ? <Button variant="outline" onClick={() => setStep(0)}>Previous</Button> : '-'}
                {step == 0 ? <Button onClick={() => setStep(1)}>Next</Button> : <Button onClick={GenerateCourseOutline}>Generate</Button>}

            </div>
        </div>
    )
}

export default Create;