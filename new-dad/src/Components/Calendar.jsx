import React, { useState, useEffect, useCallback } from 'react';
import { useUserContext } from '../Contexts/UserContext';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import axios from 'axios';

export const Calendar = () => {
    const { currentUser } = useUserContext();
    // Sets actual real time day
    const [value, setValue] = useState(dayjs());
    // Stores activities from API
    const [activities, setActivities] = useState([]);
    const [selectedDayActivities, setSelectedDayActivities] = useState([]);
    // Stores activity CRUD 
    const [editActivity, setEditActivity] = useState('');
    const [editActivityId, setEditActivityId] = useState(null);

    

    useEffect(() => {
        const fetchActivities = (userId) => {
            axios.get(`http://localhost:8005/api/NewDad-App/Calendar?userId=${userId}`)
                .then(response => {
                    setActivities(response.data);
                    // References function below
                    updateSelectedDayActivities(response.data);
                })
                .catch(error => console.error('Error fetching activities:', error));
        };

        if (currentUser) {
            fetchActivities(currentUser.id);
        }
    }, [currentUser]);

    // Should display the logged activity in realtime
    const updateSelectedDayActivities = useCallback((activities) => {
        if (value) {
            const dayActivities = activities.filter(activity => dayjs(activity.date).isSame(value, 'day'));
            setSelectedDayActivities(dayActivities);
        }
    }, [value]);

    // Handle date change in the date picker
    const handleDateChange = (newValue) => {
        setValue(dayjs(newValue));
    };

 // Update selected day activities whenever activities change
 useEffect(() => {
    updateSelectedDayActivities(activities);
}, [activities, updateSelectedDayActivities]);

// CRUD operation to edit an existing activity
    const handleUpdateActivity = (id) => {
        axios.put(`http://localhost:8005/api/NewDad-App/Calendar/${id}`, { activity: editActivity })
            .then(response => {
                const updatedActivities = activities.map(activity => 
                    activity._id === id ? response.data : activity
                );
                setActivities(updatedActivities);
                setEditActivity('');
                setEditActivityId(null);
                updateSelectedDayActivities(updatedActivities);
            })
            .catch(error => console.error('Error updating activity:', error));
    };

    // CRUD operation to delete an existing activity
    const handleDeleteActivity = (id) => {
        axios.delete(`http://localhost:8005/api/NewDad-App/Calendar/${id}`)
        .then(response => {
            const updatedActivities = activities.filter(activity => activity._id !== id);
            setActivities(updatedActivities);
            updateSelectedDayActivities(updatedActivities); // Update selected day activities after delete
        })
            .catch(error => console.error('Error deleting activity:', error));
    };


    return (
        <Card>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StaticDatePicker
                    orientation="portrait"
                    openTo='day'
                    value={value}
                    onChange={handleDateChange}
                    renderInput={(params) => (
                        <TextField {...params} />
                    )}
                />
            </LocalizationProvider>
            <CardContent>
                {selectedDayActivities.length > 0 ? (
                    selectedDayActivities.map(activity => (
                        <div key={activity._id} style={{ marginBottom: '10px' }}>
                            <Typography variant="h6">{activity.activity}</Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    setEditActivity(activity.activity);
                                    setEditActivityId(activity._id);
                                }}
                                style={{ marginRight: '10px' }}>
                                Edit
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => handleDeleteActivity(activity._id)}>
                                Delete
                            </Button>
                        </div>
                    ))
                ) : (
                    <Typography variant="h6">No activities logged for this day</Typography>
                )}
                {editActivityId && (
                    <div style={{ marginTop: '20px' }}>
                        <TextField
                            label="Update Activity"
                            value={editActivity}
                            onChange={(e) => setEditActivity(e.target.value)}
                            variant="outlined"
                            style={{ marginRight: '10px' }}/>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleUpdateActivity(editActivityId)}>
                            Update
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};
