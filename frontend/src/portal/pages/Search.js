import { IconSearch } from '@tabler/icons-react';
import React, { useState } from 'react';
import '../../../src/style/Search.css';
import axios from 'axios';
import Sprint from '../components/SearchSprint';

export default function Search() {
    const bearerToken = localStorage.getItem('user-token');
    const [query, setQuery] = useState('');
    const [sprintData, setSprintData] = useState([]);

    function searchHandle() {
        if (query !== '') {
            axios.get('http://127.0.0.1:8000/api/search/' + query, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + bearerToken,
                },
            })
                .then((res) => {
                    let test = Object.entries(res.data);
                    let tempData = [];

                    for (let i = 0; i < test.length; i++) {
                        let start_year = new Date(test[i][1]["updated_at"]).getFullYear();
                        let start_month = new Date(test[i][1]["updated_at"]).getMonth() + 1;
                        let start_date = new Date(test[i][1]["updated_at"]).getDate();
                        let end_year = new Date(test[i][1]["dueDate"]).getFullYear();
                        let end_month = new Date(test[i][1]["dueDate"]).getMonth() + 1;
                        let end_date = new Date(test[i][1]["dueDate"]).getDate();

                        tempData.push({
                            name: `${test[i][1]["taskName"]}`,
                            startDate: `${start_date}/${start_month}/${start_year}`,
                            endDate: `${end_date}/${end_month}/${end_year}`,
                            issueName: `TMST-${test[i][1]['id']}`,
                            issues: [`${test[i][1]["taskDescription"]}`],
                        });
                    }

                    setSprintData(tempData);
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });

        }
    }


    return (
        <div className='flex-col flex grow h-full'>
            <div className='search-container'>
                <input onChange={(e) => setQuery(e.target.value)} type='text' placeholder='What are you looking for?' />
                <button onClick={searchHandle}><IconSearch /> Search</button>
            </div>

            {sprintData.map(x => {
                return <Sprint {...x} />
            })}

        </div>
    )
}

