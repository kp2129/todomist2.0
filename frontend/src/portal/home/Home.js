import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Aside from '../components/Aside';
import Search from '../pages/Search';
import Reminder from '../pages/reminder';
import Backlog from '../pages/Backlog';
import Calendar from '../pages/Calendar';
import NotFound from '../pages/NotFound';
import Create from '../components/Create';
import View from '../components/View';
const Home = () => {
    const [selectedPage, setSelectedPage] = useState('backlog');
    const navigate = useNavigate();

    const pages = {
        calendar: <Calendar />,
        backlog: <Backlog />,
        search: <Search />,
    };

    function switchPage(pageName) {
        setSelectedPage(pageName);
    }



    return (
        <>
            <View />
            <Create />
            <Reminder />
            <main className={selectedPage === 'login' ? 'Flex-center' : ''}>
                {selectedPage !== 'login' && <Aside switchPage={switchPage} />}
                {selectedPage in pages ? (
                    pages[selectedPage]
                ) : (
                    <NotFound />
                )}
            </main>
        </>
    );
}
export default Home;