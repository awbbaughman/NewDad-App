import './App.css';
// import { useState, useEffect } from 'react'; 
import ExerciseCard from "./Components/Exercise";
import Calendar from "./Components/Calendar";
import BabyFact from './Components/BabyFacts';
import Activities from './Components/Activities';

const App = () => {
  return (
    <>
        
        <Calendar />
        {/*<BabyFact />*/}
        {/*<Activities />*/}
        {/*<ExerciseCard />*/}

    </>
    
  );
}

export default App;

// CONSIDER: should each component/card have an "ADD TO CALENDAR" or
// "YOU DID IT, DAD" button?
// App needs Router to get from LoginForm to main app page
// App needs add and edit event functionality to calendar

/* stumped by this error:
value.isValid is not a function
TypeError: value.isValid is not a function
    at AdapterDayjs.isValid (http://localhost:3000/static/js/bundle.js:24144:20)
    at Object.getTimezone (http://localhost:3000/static/js/bundle.js:32255:58)
    at http://localhost:3000/static/js/bundle.js:31615:87
    at mountMemo (http://localhost:3000/static/js/bundle.js:54456:23)
    at Object.useMemo (http://localhost:3000/static/js/bundle.js:54841:20)
    at Object.useMemo (http://localhost:3000/static/js/bundle.js:71859:25)
    at useValueWithTimezone (http://localhost:3000/static/js/bundle.js:31615:60)
    at usePickerValue (http://localhost:3000/static/js/bundle.js:31043:82)
    at usePicker (http://localhost:3000/static/js/bundle.js:30766:94)
    at useStaticPicker (http://localhost:3000/static/js/bundle.js:31463:60)
    */
