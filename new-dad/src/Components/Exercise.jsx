import React, { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export const ExerciseCard = () => {
    
    const [exercises, setExercises] = useState([]); 
    const [randomExercise, setRandomExercise] = useState(null);

    // Function to fetch exercises and set state
    useEffect(() => {
        fetch('https://api.api-ninjas.com/v1/exercises?type=strength', {
            method: 'GET',
            headers: {
                "X-Api-Key": 'etCFlZKms+2dWrPaC8TTeA==TUpWOQvI20f9Wz3u',
            }
        })
        .then(response => response.json())
        .then(data => {
            const bodyOnlyExercises = data.filter(exercise => exercise.equipment === "body_only");
    // Now updates state variable with filtered array of exercises above
            setExercises(bodyOnlyExercises);
            if (bodyOnlyExercises.length > 0) {
                const initialRandomExercise = bodyOnlyExercises[Math.floor(Math.random() * bodyOnlyExercises.length)];
                setRandomExercise(initialRandomExercise);
            }
        })
        .catch(error => console.error('Error:', error));
    }, []);

    // Function to handle generating a new random exercise
    const generateNewExercise = () => {
        const newExercise = exercises[Math.floor(Math.random() * exercises.length)];
        setRandomExercise(newExercise);
    };
    
    // Ensure exercises is an array and has a valid length
    if (!Array.isArray(exercises) || exercises.length === 0) {
        return <div>No exercises found.</div>;
    }

    // Ensure randomExercise is not null before rendering
    if (!randomExercise) {
        return <div>Loading...</div>;
    }
    
    return (
        <Card style={{ width: '300px', marginBottom: '20px' }}>
            <CardContent>
                <Typography variant="h5">{randomExercise.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                    Instructions: {randomExercise.instructions}
                </Typography>
                <Button variant="contained" color="primary" onClick={generateNewExercise} style={{ marginTop: '10px' }}>
                    Generate New Exercise
                </Button>
            </CardContent>
        </Card>
    );
}
