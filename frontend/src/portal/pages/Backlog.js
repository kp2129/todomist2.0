import React, { useState, useEffect } from 'react';
import View from '../components/View.js';
import Create from '../components/Create.js';
import { IconPlus, IconChevronDown, IconChevronRight, IconDots, IconPencil } from '@tabler/icons-react';
import axios from 'axios';

function Sprint({ name, startDate, endDate, issues, issueName }) {
  const [showIssues, setShowIssues] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <div className='sprints'>
        <div className='top-sprint'>
          <div className='left-side-sprint' onClick={() => setShowIssues(!showIssues)}>
            {showIssues ? <IconChevronDown /> : <IconChevronRight />} <p>{`${name} ${startDate} - ${endDate} (${issues.length} issues)`}</p>
          </div>
          <div className='right-side-sprint'>
            <button>Complete sprint</button>
            <button onClick={() => setShowPopup(!showPopup)}><IconDots /></button>
          </div>
        </div>

        {/* Pop-up */}
        {showPopup && (
          <div className='popup'>
            <div className='popup-content'>
              {/* Pop-up content goes here */}
              <p>Pop-up content</p>
            </div>
            <button className='close-button' onClick={() => setShowPopup(false)}>Close</button>
          </div>
        )}

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
            <div className='issue-div'>
              <IconPlus /> <p className="hideMe" onClick={() => setShowPopup(true)}>Create Issue</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function Backlog() {
  const [showBacklog, setShowBacklog] = useState(false);
  const [sprintsData, setSprintsData] = useState([]);
  const [createIssue, setCreateIssue] = useState(false);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/get').then((res) => {
      if (res.data.code === 0) {
        alert("Error: " + res.data.reason);
      } else {
        let test = Object.entries(res.data);
        let tempData = [];
        let issues = [];
        for (let i = 0; i < test.length; i++) {
          let start_year = new Date(test[i][1]["updated_at"]).getFullYear();
          let start_month = new Date(test[i][1]["updated_at"]).getMonth() + 1;
          let start_date = new Date(test[i][1]["updated_at"]).getDate();
          let end_year = new Date(test[i][1]["dueDate"]).getFullYear();
          let end_month = new Date(test[i][1]["dueDate"]).getMonth() + 1;
          let end_date = new Date(test[i][1]["dueDate"]).getDate();
          tempData.push({ name: `${test[i][1]["taskName"]}`, startDate: `${start_date}/${start_month}/${start_year}`, endDate: `${end_date}/${end_month}/${end_year}`, issueName: `TMST-${test[i][1]['id']}`, issues: [`${test[i][1]["taskDescription"]}`] });
        }
        setSprintsData(tempData);
      }
    });
  }, []);

  return (
    <>
      <div className='backlog'>
        {sprintsData.map((sprint) => (
          <Sprint {...sprint} />
        ))}
        <div className='backlog-card'>
          <div className='top-sprint' onClick={() => setShowBacklog(!showBacklog)}>
            <div className='left-side-sprint'>
              {showBacklog ? <IconChevronDown /> : <IconChevronRight />} <p>Backlog (0 issues)</p>
            </div>
            <div className='right-side-sprint'>
              <button>Create sprint</button>
            </div>
          </div>
          {showBacklog && (
            <>
              <div className='backlog-cards'>
                Your backlog is empty
              </div>
              <div className='issue-div' onClick={() => setCreateIssue(true)}>
                <IconPlus /> <p>Create issue</p>
                <Create open={createIssue} close={() => setCreateIssue(false)} />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Backlog;
