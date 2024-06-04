"use client" // this might cause issues -- can double check with Luis about this -- as opposed to "use server"
import Image from "next/image";
import styles from "./page.module.css";
import React, { useState, useEffect } from 'react'; 
import ExerciseCard from "../src/Components/Exercise";
import 'bootstrap/dist/css/bootstrap.min.css';


export default function HomePage() {
  
 { /*useEffect(() => {
  const getExercises = fetch(`https://api-ninjas.com/api/exercises?type=plyometrics`)
      .then(response => response.json());
  const getActivities = fetch('https://bored-api.appbrewery.com/filter?type=relaxation')
      .then(response => response.json());

      Promise.all([getExercises, getActivities])
      .then(([exercises, activities]) => {
        console.log(exercises, activities)
        .then((setExercise(exercises)))
            })
      .catch(error => {
        console.error(error);
      });
    }) */}

  return (
    <main className={styles.main}>
      
        <>
        <ExerciseCard></ExerciseCard>
        </>
    </main>
  );
}
