import { createContext, useContext, useState } from 'react';

const TimelineContext = createContext();

const initialTimeline = [
  { id: 't1', type: 'Call', friendName: 'Marcus Johnson', date: '2026-03-19' },
  { id: 't2', type: 'Text', friendName: 'Sarah Chen', date: '2026-03-11' },
  { id: 't3', type: 'Video', friendName: 'Marcus Johnson', date: '2026-03-06' },
  { id: 't4', type: 'Video', friendName: 'Ryan O\'Brien', date: '2026-02-24' },
  { id: 't5', type: 'Text', friendName: 'Olivia Martinez', date: '2026-03-13' },
  { id: 't6', type: 'Call', friendName: 'Sarah Chen', date: '2026-03-11' },
  { id: 't7', type: 'Call', friendName: 'Aisha Patel', date: '2026-03-21' },
];

export function TimelineProvider({ children }) {
  const [timeline, setTimeline] = useState(initialTimeline);

  const addEntry = (type, friendName) => {
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const newEntry = {
      id: `t${Date.now()}`,
      type,
      friendName,
      date: dateStr,
    };
    setTimeline(prev => [newEntry, ...prev]);
  };

  return (
    <TimelineContext.Provider value={{ timeline, addEntry }}>
      {children}
    </TimelineContext.Provider>
  );
}

export function useTimeline() {
  return useContext(TimelineContext);
}
