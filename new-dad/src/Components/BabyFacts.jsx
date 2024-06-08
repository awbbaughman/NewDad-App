import React, { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import axios from 'axios';

export const BabyFact = () => {
    // Stores the API data
    const [babyFact, setBabyFact] = useState(null);
    // Starts the data at week 1
    const [currentWeek, setCurrentWeek] = useState(1);

// FETCHES baby fact for the current week when component mounts
    useEffect(() => {
        fetchFactByWeek();
    }, [currentWeek]); // Re-run effect whenever currentWeek changes

    const fetchFactByWeek = () => {
        axios.get(`http://localhost:8005/api/NewDad-App/BabyFacts`)
        .then(response => {
            const nextBabyFact = response.data.find(fact => fact.week === currentWeek);
            setBabyFact(nextBabyFact);
        })
        .catch(error => {
            console.error('Error fetching baby fact.', error);
        });
    };

// Moves data to the next week
    const incrementWeek = () => {
        setCurrentWeek(prevWeek => prevWeek + 1);
    };

    return (
        <>
            {babyFact && (
                <Card style={{ marginBottom: '20px' }}>
                    <CardContent>
                    <Typography variant="h4">What's going on with your baby this week?</Typography>
                        <Typography variant="h6">
                        Baby Fact Week {babyFact.week}:</Typography>
                        <Typography variant="body1">{babyFact.fact}</Typography>
                    </CardContent>
                    <button onClick={incrementWeek}>Next Week</button>
                </Card>
            )}
            
        </>
    );
};
