import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function View() {
    const [todoData, setTodoData] = useState([]);
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/get').then((res) => {
            if(res.data.code === 0){
                alert("Error: "+ res.data.reason);
            }else{
                // console.log(res.data.reason);
                // console.log(res.data);
                setTodoData(res.data);
            }
            
        });
    }, [setTodoData]);
    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {/* <p>{todoData.id}</p> */}
            </div>
        </>
    )
}