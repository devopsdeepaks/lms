"use client"
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import FlashCardItem from './_component/FlashCardItem'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { index } from 'drizzle-orm/gel-core'

const FlashCards = () => {
    const { courseId } = useParams()
    const [Flashcard, setFlashcard] = useState([]);
    const [isFlipped, setIsFlipped] = useState();
    const [api, setApi] = useState();
    useEffect(() => {
        getFlashCards()
    }, [])
    useEffect(() => {
        if (!api) {
            return;
        }
        api.on('select', () => {
            setIsFlipped(false);
        })
    }, [api])
    const getFlashCards = async () => {
        const result = await axios.post('/api/study-type', {
            courseId: courseId,
            studyType: "flashCard"
        });
        setFlashcard(result?.data);
        console.log('Flashcard', result.data)
    }

    const handleClick = () => {
        setIsFlipped(!isFlipped);
        // console.log("this is flipped", isFlipped)
    }
    return (
        <div>
            <h1 className='font-bold text-2xl'>FlashCards</h1>
            <p>FlashCards : The Ultimate tool to lock in concepts!</p>
            <div>
                <Carousel setApi={setApi}>
                    <CarouselContent>
                        {Flashcard?.content && Flashcard.content.map((flashcard, index) => (
                            <CarouselItem key={index}><FlashCardItem handleClick={handleClick} isFlipped={isFlipped} flashcard={flashcard} /></CarouselItem>
                        ))}


                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>


            </div>
        </div>
    )
}

export default FlashCards