"use client"
import axios from 'axios'
import { useParams, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Quiz = () => {
    const { courseId } = useParams()
    const [quizData, setQuizData] = useState();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showAnswer, setShowAnswer] = useState(false);
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        getQuiz();
    }, [])

    const getQuiz = async () => {
        const result = await axios.post('/api/study-type', {
            courseId: courseId,
            studyType: 'Quiz'
        });
        setQuizData(result.data);
    }

    const handleNext = () => {
        if (currentQuestionIndex < (quizData?.content?.questions?.length - 1)) {
            setCurrentQuestionIndex(prev => prev + 1);
            setSelectedAnswer(null);
            setShowAnswer(false);
            setIsAnswerCorrect(null);
        }
    }

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
            setSelectedAnswer(null);
            setShowAnswer(false);
            setIsAnswerCorrect(null);
        }
    }

    const handleAnswerSelect = (index) => {
        const currentQuestion = quizData.content.questions[currentQuestionIndex];
        const isCorrect = currentQuestion.options[index] === currentQuestion.correctAnswer;

        setSelectedAnswer(index);
        setShowAnswer(true);
        setIsAnswerCorrect(isCorrect);

        // Store the answer
        const newAnswers = [...answers];
        newAnswers[currentQuestionIndex] = {
            selected: index,
            isCorrect: isCorrect
        };
        setAnswers(newAnswers);
    }

    const calculateProgress = () => {
        if (!quizData?.content?.questions) return 0;
        return ((currentQuestionIndex + 1) / quizData.content.questions.length) * 100;
    }

    const handleSubmit = () => {
        // Calculate score
        const score = answers.filter(answer => answer?.isCorrect).length;
        const totalQuestions = quizData.content.questions.length;
        alert(`Quiz completed! Your score: ${score}/${totalQuestions}`);
    }

    return (
        <div className="max-w-2xl mx-auto p-6">
            {quizData?.content?.questions && (
                <>
                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
                        <div
                            className="bg-blue-600 h-2.5 rounded-full"
                            style={{ width: `${calculateProgress()}%` }}
                        ></div>
                    </div>

                    {/* Question Number */}
                    <div className="text-sm text-gray-500 mb-2">
                        Question {currentQuestionIndex + 1} of {quizData.content.questions.length}
                    </div>

                    {/* Question */}
                    <div className="text-xl font-semibold mb-4">
                        {quizData.content.questions[currentQuestionIndex].question}
                    </div>

                    {/* Options */}
                    <div className="space-y-3 mb-6">
                        {quizData.content.questions[currentQuestionIndex].options.map((option, index) => (
                            <button
                                key={index}
                                className={`w-full p-3 text-left rounded-lg border ${selectedAnswer === index
                                    ? isAnswerCorrect
                                        ? 'bg-green-100 border-green-500'
                                        : 'bg-red-100 border-red-500'
                                    : 'border-gray-300 hover:bg-gray-50'
                                    }`}
                                onClick={() => handleAnswerSelect(index)}
                                disabled={showAnswer}
                            >
                                {option}
                            </button>
                        ))}
                    </div>

                    {/* Answer */}
                    {showAnswer && (
                        <div className={`mb-6 p-4 rounded-lg ${isAnswerCorrect ? 'bg-green-50' : 'bg-red-50'
                            }`}>
                            <p className="font-medium">
                                {isAnswerCorrect ? 'Correct!' : 'Incorrect!'}
                            </p>
                            <p>Correct Answer: {quizData.content.questions[currentQuestionIndex].correctAnswer}</p>
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between">
                        <button
                            onClick={handlePrevious}
                            disabled={currentQuestionIndex === 0}
                            className={`px-4 py-2 rounded ${currentQuestionIndex === 0
                                ? 'bg-gray-300 cursor-not-allowed'
                                : 'bg-blue-500 text-white hover:bg-blue-600'
                                }`}
                        >
                            Previous
                        </button>
                        {currentQuestionIndex === quizData.content.questions.length - 1 ? (
                            <button
                                onClick={handleSubmit}
                                className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600"
                            >
                                Submit Quiz
                            </button>
                        ) : (
                            <button
                                onClick={handleNext}
                                disabled={!showAnswer}
                                className={`px-4 py-2 rounded ${!showAnswer
                                    ? 'bg-gray-300 cursor-not-allowed'
                                    : 'bg-blue-500 text-white hover:bg-blue-600'
                                    }`}
                            >
                                Next
                            </button>
                        )}
                    </div>
                </>
            )}
        </div>
    )
}

export default Quiz