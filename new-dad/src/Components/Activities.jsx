import { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import axios from 'axios';

const Activities = () => {

    const [activities, setActivities] = useState([]);

    useEffect(() => {
        axios.get('/api/NewDad-App/Activities')
        .then(response => setActivities(response.data))
        .catch(error => console.error(error));
    }, []);


    return (
        <>
            <Card style={{ width: '160px' }}
              // onClick={() => handleHeroSelect(hero.name)} option to add an onclick/touch function
            >
              {/*<Card.Img
                src={exercises.portrait}
                style={{ height: '120px', objectFit: 'cover' }}/>*/}

            <Card.Body>
                <Card.Title>{activities.activity}</Card.Title>
                {/* add if statement here for if there is a link in the json}*/}
                <Card.Text>Learn More: {activities.link}</Card.Text>
            </Card.Body>
     </Card>
     </>
    )
   
};

export default Activities;