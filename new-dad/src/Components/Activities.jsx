import { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import axios from 'axios';

export const Activities = () => {
      // Store activities from API
    const [activities, setActivities] = useState([]);
       // Stores a randomized activity from API
    const [randomActivity, setRandomActivity] = useState(null);

    useEffect(() => {
        fetchActivities();
    }, []);

// GET then filter the activities based on "accessibility" Key Pair. Should exclude activities where accessibility: "Major challenges"
    const fetchActivities = () => {
        axios.get(`http://localhost:8005/api/NewDad-App/Activities`)
            .then(response => {
                const filteredActivities = response.data.filter(activity =>
                    activity.accessibility === "Few to no challenges" ||
                    activity.accessibility === "Minor challenges"
                );
                setActivities(filteredActivities);
                if (filteredActivities.length > 0) {
                    setRandomActivity(filteredActivities[Math.floor(Math.random() * filteredActivities.length)]);
                }
            })
            .catch(error => console.error('Error fetching activities:', error));
    };

    // Fetches a new RANDOM activity from API.
    const fetchNewActivity = () => {
        const newRandomActivity = activities[Math.floor(Math.random() * activities.length)];
        setRandomActivity(newRandomActivity);
    };



// Logs and records the activity to the Calendar.jsx
    const logActivityToCalendar = () => {
        if (randomActivity) {
            axios.post('http://localhost:8005/api/NewDad-App/Calendar', {
                activity: randomActivity.activity,
                date: new Date()
            })
            .then(response => {
                console.log('Activity logged successfully:', response.data);
                // Should UPDATE state to immediately reflect the logged activity, but it is not working.
                setRandomActivity(prevActivity => ({
                    ...prevActivity,
                    logged: true
                }));
            })
                .catch(error => {
                    console.error('Error logging activity:', error);
                });
        }
    };

    if (!Array.isArray(activities) || activities.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <Card style={{ width: '300px', marginBottom: '20px' }}>
            <CardContent>
                <Typography variant="h4">
                    Hey Dad: What should you do today?
                </Typography>
                <Typography variant="h5">{randomActivity.activity}</Typography>
                {randomActivity.link && (
                    <Typography variant="body2" color="text.secondary">
                        Learn More: <a href={randomActivity.link} target="_blank" rel="noopener noreferrer">{randomActivity.link}</a>
                    </Typography>
                )}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={logActivityToCalendar}
                    style={{ marginTop: '10px', marginRight: '10px' }}
                >
                    Log Activity to Calendar
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={fetchNewActivity}
                    style={{ marginTop: '10px' }}
                >
                    Get New Activity
                </Button>
            </CardContent>
        </Card>
    );
};
