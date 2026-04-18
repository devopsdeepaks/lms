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

const FlashCards = () => {
    const { courseId } = useParams()
    const [Flashcard, setFlashcard] = useState(null);
    const [isFlipped, setIsFlipped] = useState(false);
    const [api, setApi] = useState();

    useEffect(() => {
        getFlashCards()
    }, [])

    useEffect(() => {
        if (!api) return;
        api.on('select', () => {
            setIsFlipped(false);
        })
    }, [api])

    const getFlashCards = async () => {
        const result = await axios.post('/api/study-type', {
            courseId: courseId,
            studyType: "flashCard"
        });
        const data = result?.data;
        // Normalize: content may be an array directly or wrapped in an object
        if (data?.content && !Array.isArray(data.content) && Array.isArray(data.content?.results)) {
            data.content = data.content.results;
        }
        setFlashcard(data);
    }

    const handleClick = () => {
        setIsFlipped(prev => !prev);
    }

    const cards = Array.isArray(Flashcard?.content) ? Flashcard.content : [];

    return (
        <div>
            <h1 className='font-bold text-2xl'>FlashCards</h1>
            <p>FlashCards: The Ultimate tool to lock in concepts!</p>
            <div>
                {Flashcard === null && <p className='text-center text-gray-500 mt-10'>Loading flashcards...</p>}
                {Flashcard !== null && cards.length === 0 && <p className='text-center text-gray-500 mt-10'>No flashcard content available yet.</p>}
                {cards.length > 0 && (
                    <Carousel setApi={setApi}>
                        <CarouselContent>
                            {cards.map((flashcard, index) => (
                                <CarouselItem key={index}>
                                    <FlashCardItem handleClick={handleClick} isFlipped={isFlipped} flashcard={flashcard} />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                )}
            </div>
        </div>
    )
}

export default FlashCards