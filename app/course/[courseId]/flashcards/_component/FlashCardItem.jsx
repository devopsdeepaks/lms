import React from 'react'
import ReactCardFlip from 'react-card-flip';

const FlashCardItem = ({ isFlipped, handleClick, flashcard }) => {
    return (
        <div className='mt-16 flex items-center justify-center '>
            <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
                <div className='p-4 bg-blue-600 text-white flex items-center justify-center rounded-lg cursor-pointer h-[250px] w-[200px] md:h-[350px] md:w-[300px] shadow-lg' onClick={handleClick}>
                    <h2>{flashcard?.front}</h2>
                </div>

                <div className='p-4 bg-white shadow-lg text-black flex items-center justify-center rounded-lg cursor-pointer h-[250px] w-[200px] md:h-[350px] md:w-[300px]' onClick={handleClick}>
                    <h2>{flashcard?.back}</h2>
                </div>
            </ReactCardFlip>

        </div>
    )
}

export default FlashCardItem