"use client"; // This line marks the file as a client component

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios"; // Ensure axios is imported
import { Button } from "@/components/ui/button";

function ViewNotes() {
    const { courseId } = useParams(); // Extract courseId from URL params
    const [notes, setNotes] = useState([]); // Initialize with empty array
    const [stepCount, setStepCount] = useState(0);

    useEffect(() => {
        GetNotes(); // Fetch notes when the component mounts
    }, [courseId]); // Depend on `courseId` so the effect re-runs when it changes

    // Function to fetch notes from the API
    const GetNotes = async () => {
        try {
            // Make the API request
            const result = await axios.post('/api/study-type', {
                courseId: courseId,
                studyType: 'notes'
            });

            console.log(result); // Log the entire response object
            console.log(result?.data); // Log only the `data` part of the response
            
            // Assuming result.data contains an array under the `notes` field
            if (Array.isArray(result?.data?.notes)) {
                setNotes(result.data.notes); // Set notes if it's an array
            } else {
                console.error("Expected an array under `notes`, but got:", result?.data);
                setNotes([]); // Fallback to empty array if data is not an array
            }
        } catch (error) {
            console.error("Error fetching notes:", error);
            setNotes([]); // Handle errors and set notes as empty array
        }
    };

    // Render the component
    return notes && Array.isArray(notes) ? (
        <div>
            <div className="flex gap-5 items-center">
                {stepCount !== 0 && (
                    <Button variant="outline" size="sm" onClick={() => setStepCount(stepCount - 1)}>
                        Previous
                    </Button>
                )}

                {/* Render progress indicators for each note */}
                {notes.length > 0 && notes.map((item, index) => (
                    <div
                        key={index}
                        className={`w-full h-2 rounded-full ${index < stepCount ? 'bg-pink-50' : 'bg-slate-400'}`}
                    ></div>
                ))}

                <Button variant="outline" size="sm" onClick={() => setStepCount(stepCount + 1)}>
                    Next
                </Button>
            </div>

            <div className="mt-10">
                {/* Render the note's content */}
                <div dangerouslySetInnerHTML={{ __html: (notes[stepCount]?.notes)?.replace('```html', ' ') }} />
            </div>
        </div>
    ) : (
        <div>Loading notes...</div> // Loading state in case the data is not available yet
    );
}

export default ViewNotes;


