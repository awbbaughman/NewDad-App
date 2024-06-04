import { useState, useEffect } from "react";
import Card from '@mui/material/Card'

export default function ExerciseCard() {
    
    const [exercises, setExercise] = useState([]); 
    
    useEffect(() => {
      fetch('https://api-ninjas.com/api/exercises?type=plyometrics', {
        method: 'GET',
        headers: {
          "X-Api-Key": `etCFlZKms+2dWrPaC8TTeA==TUpWOQvI20f9Wz3u`,
          "Accept": 'application/json',
            }
        })
        .then(exercises => exercises.json())
        .then(exercises => console.log(exercises))
        .then((setExercise(exercises)))
        .catch(error => console.error('Error:', error));
    }, [exercises]);
    
  return (
    <Card style={{ width: '160px' }}
              // onClick={() => handleHeroSelect(hero.name)} option to add an onclick/touch function
            >
              {/*<Card.Img
                src={exercises.portrait}
                style={{ height: '120px', objectFit: 'cover' }}/>*/}

            <Card.Body>
                <Card.Title>{exercises.name}</Card.Title>
                <Card.Text>Instructions: {exercises.instructions}</Card.Text>
            </Card.Body>
     </Card>

  )
}