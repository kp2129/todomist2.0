import React, { useState } from 'react';
import { IconChevronDown, IconChevronRight, IconTimeline, IconColumns3, IconStack3, IconCalendar, IconSearch } from '@tabler/icons-react';

function Aside(props) {
  const [sections, setSections] = useState({ timeline: false, example: false });

  const handleToggleSection = (section) => {
    setSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const getButtonIcon = (isSectionOpen) => {
    return isSectionOpen ? <IconChevronDown /> : <IconChevronRight />;
  };

  return (
    <aside>
      <div className={`side-bar-top ${sections.timeline ? 'active' : ''}`}>
        <div className='side-bar-side-top'>
          <div className='side-bar-buttons-top'>
            <button onClick={() => handleToggleSection('timeline')}>
              {getButtonIcon(sections.timeline)}
            </button>
          </div>
          <div className={`planning-section ${sections.timeline ? 'active' : 'bg-white'}`}>
            <p>PLANNING</p>
            
              <div className={(sections.timeline) ? 'inner-data' : 'hidden'}>
                <p onClick={() => props.switchPage('timeline')}><IconTimeline /> Timeline</p>
                <p onClick={() => props.switchPage('backlog')}><IconStack3/> Backlog</p>
                <p onClick={() => props.switchPage('board')}><IconColumns3 /> Board</p>
                <p onClick={() => props.switchPage('calendar')}><IconCalendar /> Calendar</p>
                <p onClick={() => props.switchPage('search')}><IconSearch /> Search</p>
              </div>
            
          </div>
        </div>
      </div>
      <div className={`side-bar-bottom ${sections.example ? 'active' : ''}`}>
        <div className='side-bar-side-top'>
          <div className='side-bar-buttons-top'>
            <button onClick={() => handleToggleSection('example')}>
              {getButtonIcon(sections.example)}
            </button>
          </div>
          <div className={`planning-section ${sections.example ? 'active' : ''}`}>
            <p>PROJECT SETTINGS</p>
            {sections.example && (
              <div className='inner-data'>
                <p>Details</p>
                <p>Access</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Aside;
