import React, { useState } from 'react';
import View from './View.js';
import { IconPlus, IconChevronDown, IconChevronRight, IconDots, IconPencil } from '@tabler/icons-react';


export default function Sprint({ name, startDate, endDate, issues, issueName }) {
    
    const [showIssues, setShowIssues] = useState(false);
    
    function Hide({}){
        
    }

    return (
        <>
            <div className='sprints'>
                <div className='top-sprint'>
                    <div className='left-side-sprint' onClick={() => setShowIssues(!showIssues)}>
                        {showIssues ? <IconChevronDown /> : <IconChevronRight />} <p>{`${name} ${startDate} - ${endDate} (${issues.length} issues)`}</p>
                    </div>
                    
                </div>
                {showIssues && (
                    <div className='sprint-cards'>
                        {issues.map((issue, index) => (
                            <div className="sprint-task" key={index}>
                                <div className='sprint-task-left'>
                                    <View />
                                    <p>{issueName}</p><p>{issue} </p><IconPencil />
                                </div>
                                <div className='sprint-task-right'>
                                    <div className='profile-icon'>
                                        <img src="https://media.tenor.com/AlvyE4oRj24AAAAd/nerd-nerd-emoji.gif" alt="Profile"></img>
                                    </div>
                                    <IconDots />
                                </div>
                            </div>
                        ))}
                        
                    </div>
                )}

            </div>
        </>
    );
}
