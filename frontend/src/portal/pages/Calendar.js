import React, { useEffect, useState } from 'react';
import '../../style/Calendar.css';

export default function Calendar() {
    const [emptyDays, setEmptyDays] = useState([]);

    const getDaysInMonthArray = () => {
        const currentDate = new Date(); // Get the current date
        const year = currentDate.getFullYear(); // Get the current year
        const month = currentDate.getMonth(); // Get the current month (0-indexed)
      
        // Create a new date for the first day of the month
        const firstDayOfMonth = new Date(year, month, 1);
        // Create a new date for the last day of the month
        const lastDayOfMonth = new Date(year, month + 1, 0);
      
        const daysArray = [];
        
        // Loop through each day of the month and add it to the array
        for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
          daysArray.push(new Date(year, month, i));
        }
      
        return daysArray;
    };

    function calcEmptyDays() {
        const now = new Date(); // Get the current date
        const firstDay = new Date(now.getFullYear(), now.getMonth(), 1); // Set the date to the 1st of the current month
      
        const dayOfWeek = firstDay.getDay(); // Get the day of the week (0-6)
        
        // Return the day of the week as a string
        setEmptyDays(Array(dayOfWeek - 1).fill(0));
    }
      
    
    useEffect(() => {
        calcEmptyDays();
    }, []);
    
  
    

    return (
        <div className='flex-col grow'>
            <div className='grid grid-cols-7 bg-light-color header-container'>
                <div>Monday</div>
                <div>Tuesday</div>
                <div>Wednesday</div>
                <div>Thursday</div>
                <div>Friday</div>
                <div>Saturday</div>
                <div>Sunday</div>
            </div>

            <div className='days-container grid grid-cols-7'>
                {emptyDays.map(x => {
                    return <div className='calendar-day dimmed-bg'></div>;
                })}

                {getDaysInMonthArray().map((x, i) => {
                    return (
                        <div className='calendar-day'>
                            <p className={(new Date().getDate() === x.getDate()) ? 'today-number' : 'day-number'}>{x.getDate()}</p>
                            <div className='day-tasks'>
                                {/* <button>
                                    <p>Ex deserunt incididunt duis consectetur eu est laboris qui. Do do in aute laboris. Lorem laboris proident proident do labore irure. Est laborum consequat et tempor nisi esse amet occaecat. Proident deserunt ad cillum magna labore aliqua nostrud proident ea proident et aliqua consectetur. Quis ipsum Lorem dolor velit fugiat nisi.</p>
                                </button> */}

                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}
