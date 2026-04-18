"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

function ViewNotes() {
    const { courseId } = useParams();
    const [notes, setNotes] = useState([]);
    const [stepCount, setStepCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        GetNotes();
    }, [courseId]);

    const GetNotes = async () => {
        try {
            setLoading(true);
            const result = await axios.post('/api/study-type', {
                courseId: courseId,
                studyType: 'notes'
            });
            if (Array.isArray(result?.data?.notes)) {
                setNotes(result.data.notes);
            } else {
                setNotes([]);
            }
        } catch (error) {
            console.error("Error fetching notes:", error);
            setNotes([]);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="text-center text-gray-500 mt-10">Loading notes...</div>;
    }

    if (notes.length === 0) {
        return <div className="text-center text-gray-500 mt-10">No notes available yet.</div>;
    }

    const currentNote = notes[stepCount];

    return (
        <div>
            {/* Navigation */}
            <div className="flex gap-3 items-center mb-6">
                <Button
                    variant="outline"
                    size="sm"
                    disabled={stepCount === 0}
                    onClick={() => setStepCount(prev => prev - 1)}
                >
                    Previous
                </Button>

                {/* Progress dots */}
                <div className="flex gap-2 flex-1">
                    {notes.map((_, index) => (
                        <div
                            key={index}
                            onClick={() => setStepCount(index)}
                            className={`flex-1 h-2 rounded-full cursor-pointer transition-colors ${
                                index === stepCount
                                    ? 'bg-blue-500'
                                    : index < stepCount
                                    ? 'bg-blue-200'
                                    : 'bg-slate-300'
                            }`}
                        />
                    ))}
                </div>

                <Button
                    variant="outline"
                    size="sm"
                    disabled={stepCount === notes.length - 1}
                    onClick={() => setStepCount(prev => prev + 1)}
                >
                    Next
                </Button>
            </div>

            <p className="text-sm text-gray-500 mb-4">
                Chapter {stepCount + 1} of {notes.length}
            </p>

            {/* Note content */}
            <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{
                    __html: currentNote?.notes
                        ?.replace(/```html\s*/gi, '')
                        .replace(/```\s*/g, '')
                        .trim() ?? ''
                }}
            />
        </div>
    );
}

export default ViewNotes;
