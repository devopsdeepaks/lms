"use client"
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

// Handles all formats the AI might return
function normalizeQuestions(content) {
    if (!content) return [];

    // Get the raw questions array
    let raw = [];
    if (Array.isArray(content)) {
        raw = content;
    } else if (Array.isArray(content.questions)) {
        raw = content.questions;
    } else if (Array.isArray(content.quiz)) {
        raw = content.quiz;
    } else {
        return [];
    }

    return raw.map(q => {
        // Normalize options: could be "options", "choices", "answers"
        let options = q.options || q.choices || q.answers || [];

        // Strip "A. " / "B. " prefixes from options like "A. Paris"
        options = options.map(opt =>
            typeof opt === 'string' ? opt.replace(/^[A-Da-d]\.\s*/, '').trim() : String(opt)
        );

        // Normalize correctAnswer
        let correct = q.correctAnswer ?? q.correct_answer ?? q.answer ?? q.correct ?? '';
        correct = String(correct).trim();

        // If correctAnswer is a single letter like "A", "B", "C", "D"
        if (/^[A-Da-d]$/.test(correct)) {
            const idx = correct.toUpperCase().charCodeAt(0) - 65;
            correct = options[idx] ?? correct;
        }
        // If correctAnswer is "1", "2", "3", "4" (1-indexed)
        else if (/^[1-4]$/.test(correct)) {
            correct = options[parseInt(correct) - 1] ?? correct;
        }
        // If correctAnswer is "0","1","2","3" (0-indexed number)
        else if (/^[0-3]$/.test(correct) && options.length > parseInt(correct)) {
            correct = options[parseInt(correct)] ?? correct;
        }
        // Strip "A. " prefix if correctAnswer itself had it
        else {
            correct = correct.replace(/^[A-Da-d]\.\s*/, '').trim();
        }

        return {
            question: q.question || q.text || q.q || 'Unknown question',
            options,
            correctAnswer: correct,
        };
    }).filter(q => q.options.length > 0);
}

const Quiz = () => {
    const { courseId } = useParams()
    const [questions, setQuestions] = useState([])
    const [loading, setLoading] = useState(true)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [selectedIndex, setSelectedIndex] = useState(null)
    const [showAnswer, setShowAnswer] = useState(false)
    const [score, setScore] = useState(0)
    const [finished, setFinished] = useState(false)

    useEffect(() => { loadQuiz() }, [])

    const loadQuiz = async () => {
        try {
            setLoading(true)
            const res = await axios.post('/api/study-type', { courseId, studyType: 'quiz' })
            const qs = normalizeQuestions(res.data?.content)
            setQuestions(qs)
        } catch (e) {
            console.error('Quiz load error:', e)
        } finally {
            setLoading(false)
        }
    }

    const handleSelect = (index) => {
        if (showAnswer) return
        const correct = questions[currentIndex]?.options?.[index] === questions[currentIndex]?.correctAnswer
        setSelectedIndex(index)
        setShowAnswer(true)
        if (correct) setScore(s => s + 1)
    }

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(i => i + 1)
            setSelectedIndex(null)
            setShowAnswer(false)
        } else {
            setFinished(true)
        }
    }

    const handleRestart = () => {
        setCurrentIndex(0)
        setSelectedIndex(null)
        setShowAnswer(false)
        setScore(0)
        setFinished(false)
    }

    if (loading) return <div className="text-center text-gray-500 mt-10 p-6">Loading quiz...</div>

    if (questions.length === 0) return (
        <div className="text-center text-gray-500 mt-10 p-6">
            No quiz content available. Generate it from the course page first.
        </div>
    )

    if (finished) return (
        <div className="max-w-2xl mx-auto p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
            <p className="text-5xl font-bold text-blue-600 mb-2">{score}/{questions.length}</p>
            <p className="text-gray-500 mb-8">
                {score === questions.length ? 'Perfect score! 🎉' : score >= questions.length / 2 ? 'Good job!' : 'Keep practicing!'}
            </p>
            <button onClick={handleRestart} className="px-6 py-2 rounded bg-blue-500 text-white hover:bg-blue-600">
                Try Again
            </button>
        </div>
    )

    const q = questions[currentIndex]
    const correctIndex = q.options.indexOf(q.correctAnswer)

    const getClass = (index) => {
        const base = 'w-full p-3 text-left rounded-lg border-2 transition-all '
        if (!showAnswer) {
            return base + (selectedIndex === index ? 'bg-blue-50 border-blue-400' : 'border-gray-300 hover:bg-gray-50')
        }
        // always show correct in green
        if (index === correctIndex) return base + 'bg-green-100 border-green-500 font-medium'
        // show wrong selection in red
        if (index === selectedIndex) return base + 'bg-red-100 border-red-500'
        return base + 'border-gray-200 text-gray-400'
    }

    return (
        <div className="max-w-2xl mx-auto p-6">
            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                />
            </div>
            <p className="text-sm text-gray-500 mb-6">Question {currentIndex + 1} of {questions.length}</p>

            {/* Question */}
            <p className="text-xl font-semibold mb-5">{q.question}</p>

            {/* Options */}
            <div className="space-y-3 mb-6">
                {q.options.map((opt, i) => (
                    <button
                        key={i}
                        className={getClass(i)}
                        onClick={() => handleSelect(i)}
                        disabled={showAnswer}
                    >
                        <span className="font-medium mr-2 text-gray-500">
                            {String.fromCharCode(65 + i)}.
                        </span>
                        {opt}
                    </button>
                ))}
            </div>

            {/* Feedback */}
            {showAnswer ? (
                <div className={`mb-4 p-3 rounded-lg border text-sm ${
                    selectedIndex === correctIndex
                        ? 'bg-green-50 border-green-200 text-green-800'
                        : 'bg-red-50 border-red-200 text-red-800'
                }`}>
                    {selectedIndex === correctIndex
                        ? '✓ Correct!'
                        : `✗ Wrong — correct answer: ${q.correctAnswer}`}
                </div>
            ) : (
                <p className="text-sm text-gray-400 mb-4">Select an answer to continue</p>
            )}

            {/* Next button — only shows after answering */}
            {showAnswer && (
                <div className="flex justify-end">
                    <button
                        onClick={handleNext}
                        className="px-6 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 font-medium"
                    >
                        {currentIndex === questions.length - 1 ? 'See Results' : 'Next →'}
                    </button>
                </div>
            )}
        </div>
    )
}

export default Quiz
