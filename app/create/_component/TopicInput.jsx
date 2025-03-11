"use client";
import { Textarea } from '@/components/ui/textarea';
import React from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
const TopicInput = ({ setTopic, setDifficultyLevel }) => {
    return (
        <div className='mt-10 w-full '>
            <h2>Enter Topic or Paste the Content for which you want to generate the study material</h2>
            <Textarea placeholder="Start Writing Here" className="mt-2" onChange={(event) => setTopic(event.target.value)} />
            <h2 className='mt-5 mb-3'>Select the Difficulty Level</h2>
            <Select onValueChange={(value) => setDifficultyLevel(value)}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Difficulty Level" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advance">Advance</SelectItem>
                </SelectContent>
            </Select>

        </div>
    )
}

export default TopicInput